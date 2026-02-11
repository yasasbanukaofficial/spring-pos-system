package tech.yasasbanuka.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.yasasbanuka.backend.entity.OrderDetails;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, String> {
}
