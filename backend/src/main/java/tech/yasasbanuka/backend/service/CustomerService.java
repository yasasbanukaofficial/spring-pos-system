package tech.yasasbanuka.backend.service;

import tech.yasasbanuka.backend.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {
    void createCustomer(CustomerDTO customerDTO);
    void updateCustomer(CustomerDTO customerDTO);
    void deleteCustomer(String id);
    CustomerDTO getCustomer(String id);
    List<CustomerDTO> getAllCustomers();
}
