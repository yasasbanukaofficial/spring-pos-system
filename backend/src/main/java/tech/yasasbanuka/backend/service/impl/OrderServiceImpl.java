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

        Customer customer = customerRepository.findById(orderDTO.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer Not found"));

        modelMapper.map(orderDTO, existingOrder);
        existingOrder.setCustomer(customer);

        List<OrderDetails> updatedDetails = orderDTO.getOrderDetails().stream().map(dto -> {
            OrderDetails detail = modelMapper.map(dto, OrderDetails.class);
            detail.setOrder(existingOrder);

            Item item = itemRepository.findById(dto.getItemCode())
                    .orElseThrow(() -> new RuntimeException("Item Not found: " + dto.getItemCode()));
            detail.setItem(item);

            return detail;
        }).toList();

        existingOrder.getOrderDetails().clear();
        existingOrder.getOrderDetails().addAll(updatedDetails);

        orderRepository.save(existingOrder);
    }

    @Override
    public void deleteOrder(String id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete. Order not found with ID: " + id);
        }
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
