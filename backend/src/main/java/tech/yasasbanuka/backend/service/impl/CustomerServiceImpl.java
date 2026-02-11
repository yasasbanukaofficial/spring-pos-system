package tech.yasasbanuka.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import tech.yasasbanuka.backend.dto.CustomerDTO;
import tech.yasasbanuka.backend.entity.Customer;
import tech.yasasbanuka.backend.repository.CustomerRepository;
import tech.yasasbanuka.backend.service.CustomerService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final ModelMapper modelMapper;

    @Override
    public void createCustomer(CustomerDTO customerDTO) {
        customerRepository.save(modelMapper.map(customerDTO, Customer.class));
    }

    @Override
    public void updateCustomer(CustomerDTO customerDTO) {
        customerRepository.save(modelMapper.map(customerDTO, Customer.class));
    }

    @Override
    public void deleteCustomer(String id) {
        customerRepository.deleteById(id);
    }

    @Override
    public CustomerDTO getCustomer(String id) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer Not found"));
        return modelMapper.map(customer, CustomerDTO.class);
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        return customers.stream().map(customer -> modelMapper.map(customer, CustomerDTO.class)).collect(Collectors.toList());
    }
}
