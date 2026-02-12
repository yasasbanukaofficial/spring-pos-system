package tech.yasasbanuka.backend.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import tech.yasasbanuka.backend.dto.OrderDTO;
import tech.yasasbanuka.backend.entity.Customer;
import tech.yasasbanuka.backend.entity.Item;
import tech.yasasbanuka.backend.entity.Order;
import tech.yasasbanuka.backend.entity.OrderDetails;
import tech.yasasbanuka.backend.repository.CustomerRepository;
import tech.yasasbanuka.backend.repository.ItemRepository;
import tech.yasasbanuka.backend.repository.OrderRepository;
import tech.yasasbanuka.backend.service.OrderService;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ItemRepository itemRepository;
    private final ModelMapper modelMapper;

    @Override
    public void createOrder(OrderDTO orderDTO) {
        Customer customer = customerRepository.findById(orderDTO.getCustomerId()).orElseThrow(() -> new RuntimeException("Customer Not found"));

        Order order = modelMapper.map(orderDTO, Order.class);
        order.setCustomer(customer);

        List<OrderDetails> orderDetails = orderDTO.getOrderDetails().stream().map(orderDetailsDTO -> {
            OrderDetails orderDetailsEntity = modelMapper.map(orderDetailsDTO, OrderDetails.class);
            orderDetailsEntity.setOrder(order);
            Item item = itemRepository.findById(orderDetailsDTO.getItemCode()).orElseThrow(() -> new RuntimeException("Item Not found"));
            
            // Reduce item quantity
            if (item.getQuantity() < orderDetailsDTO.getQty()) {
                throw new RuntimeException("Insufficient stock for item: " + item.getName());
            }
            item.setQuantity(item.getQuantity() - orderDetailsDTO.getQty());
            itemRepository.save(item);
            
            orderDetailsEntity.setItem(item);
            return orderDetailsEntity;
        }).toList();

        order.setOrderDetails(orderDetails);
        orderRepository.save(order);
    }

    @Override
    public void updateOrder(OrderDTO orderDTO) {
        Order existingOrder = orderRepository.findById(orderDTO.getId())
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderDTO.getId()));

        // Restore quantities from old order details
        existingOrder.getOrderDetails().forEach(oldDetail -> {
            Item item = oldDetail.getItem();
            item.setQuantity(item.getQuantity() + oldDetail.getQty());
            itemRepository.save(item);
        });

        Customer customer = customerRepository.findById(orderDTO.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer Not found"));

        // Update order properties without using modelMapper for the entire object
        existingOrder.setOrderDate(orderDTO.getOrderDate());
        existingOrder.setCustomer(customer);

        List<OrderDetails> updatedDetails = orderDTO.getOrderDetails().stream().map(dto -> {
            OrderDetails detail = new OrderDetails();
            detail.setQty(dto.getQty());
            detail.setUnitPrice(dto.getUnitPrice());
            detail.setOrder(existingOrder);

            Item item = itemRepository.findById(dto.getItemCode())
                    .orElseThrow(() -> new RuntimeException("Item Not found: " + dto.getItemCode()));
            
            // Deduct new quantities
            if (item.getQuantity() < dto.getQty()) {
                throw new RuntimeException("Insufficient stock for item: " + item.getName());
            }
            item.setQuantity(item.getQuantity() - dto.getQty());
            itemRepository.save(item);
            
            detail.setItem(item);

            return detail;
        }).toList();

        existingOrder.getOrderDetails().clear();
        existingOrder.getOrderDetails().addAll(updatedDetails);

        orderRepository.save(existingOrder);
    }

    @Override
    public void deleteOrder(String id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot delete. Order not found with ID: " + id));
        
        // Restore item quantities
        order.getOrderDetails().forEach(detail -> {
            Item item = detail.getItem();
            item.setQuantity(item.getQuantity() + detail.getQty());
            itemRepository.save(item);
        });
        
        orderRepository.deleteById(id);
    }

    @Override
    public OrderDTO getOrder(String id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order Not found"));

        return modelMapper.map(order, OrderDTO.class);
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();

        return orders.stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .toList();
    }
}
