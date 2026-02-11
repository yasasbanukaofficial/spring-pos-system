package tech.yasasbanuka.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tech.yasasbanuka.backend.dto.CustomerDTO;
import tech.yasasbanuka.backend.service.CustomerService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    @PostMapping
    void createCustomer(@RequestBody CustomerDTO customerDTO) {
        customerService.createCustomer(customerDTO);
    }
    @PutMapping
    void updateCustomer(@RequestBody CustomerDTO customerDTO) {
        customerService.updateCustomer(customerDTO);
    }
    @DeleteMapping("/{id}")
    void deleteCustomer(@PathVariable String id) {
        customerService.deleteCustomer(id);
    }
    @GetMapping("/{id}")
    CustomerDTO getCustomer(@PathVariable String id) {
        return customerService.getCustomer(id);
    }
    @GetMapping
    List<CustomerDTO> getAllCustomers() {
        return customerService.getAllCustomers();
    }
}
