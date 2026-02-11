package tech.yasasbanuka.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.yasasbanuka.backend.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, String> {
}
