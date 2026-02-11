package tech.yasasbanuka.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tech.yasasbanuka.backend.dto.OrderDTO;
import tech.yasasbanuka.backend.service.OrderService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    void createOrder(@RequestBody OrderDTO orderDTO) {
        orderService.createOrder(orderDTO);
    }

    @PutMapping
    void updateOrder(@RequestBody OrderDTO orderDTO) {
        orderService.updateOrder(orderDTO);
    }

    @DeleteMapping("/{id}")
    void deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
    }

    @GetMapping("/{id}")
    OrderDTO getOrder(@PathVariable String id) {
        return orderService.getOrder(id);
    }

    @GetMapping
    List<OrderDTO> getAllOrders() {
        return orderService.getAllOrders();
    }
}
