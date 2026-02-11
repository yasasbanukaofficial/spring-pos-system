package tech.yasasbanuka.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.yasasbanuka.backend.entity.Order;

public interface OrderRepository extends JpaRepository<Order, String> {
}
