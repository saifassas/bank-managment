package com.example.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.Customer;
import com.example.demo.repository.CustomerRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/Customers")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    // Get all customers
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Get a customer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        return customer.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new customer
    @PostMapping
    public ResponseEntity<?> createCustomer(@RequestBody Customer customer) {
        if (customerRepository.existsByCin(customer.getCin())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                "errorCode", "CIN_EXISTS",
                "errorMessage", "CIN already exists"
            ));
        }
        if (customerRepository.existsByEmail(customer.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                "errorCode", "EMAIL_EXISTS",
                "errorMessage", "Email already exists"
            ));
        }

        Customer savedCustomer = customerRepository.save(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCustomer);
    }


    // Update a customer
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable Long id, @RequestBody Customer customerDetails) {
        Optional<Customer> customer = customerRepository.findById(id);
        
        if (customer.isPresent()) {
            Customer existingCustomer = customer.get();

            // Check if CIN already exists for another customer
            if (customerRepository.existsByCin(customerDetails.getCin()) &&
                existingCustomer.getCin() != customerDetails.getCin()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                    "errorCode", "CIN_EXISTS",
                    "errorMessage", "CIN already exists"
                ));
            }

            // Check if Email already exists for another customer
            if (customerRepository.existsByEmail(customerDetails.getEmail()) &&
                !existingCustomer.getEmail().equals(customerDetails.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                    "errorCode", "EMAIL_EXISTS",
                    "errorMessage", "Email already exists"
                ));
            }

            existingCustomer.setFirstName(customerDetails.getFirstName());
            existingCustomer.setLastName(customerDetails.getLastName());
            existingCustomer.setCin(customerDetails.getCin());
            existingCustomer.setEmail(customerDetails.getEmail());

            Customer updatedCustomer = customerRepository.save(existingCustomer);
            return ResponseEntity.ok(updatedCustomer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a customer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isPresent()) {
            customerRepository.delete(customer.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
