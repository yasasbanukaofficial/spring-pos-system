package tech.yasasbanuka.backend.service;

import tech.yasasbanuka.backend.dto.OrderDTO;

import java.util.List;

public interface OrderService {
    void createOrder(OrderDTO orderDTO);
    void updateOrder(OrderDTO orderDTO);
    void deleteOrder(String id);
    OrderDTO getOrder(String id);
    List<OrderDTO> getAllOrders();
}
