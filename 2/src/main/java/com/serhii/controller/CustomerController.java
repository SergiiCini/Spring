package com.serhii.controller;

import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import com.serhii.service.AccountService;
import com.serhii.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private AccountService accountService;

    @GetMapping("/customer/{id}")
    public Customer getCustomer(@PathVariable long id) {
        return customerService.getOne(id);
    }

    @GetMapping("/customer")
    public List<Customer> getAllCustomers() {
        return customerService.findAll();
    }

    @PostMapping("/customer")
    public Customer createNewCustomer(@RequestBody Customer customer) {
        return customerService.save(customer);
    }

    @PutMapping("/customer/modify/{id}")
    public Customer updateCustomer(@PathVariable long id, @RequestBody Customer customer) {
        return customerService.modify(id, customer);
    }

    @DeleteMapping("/customer/{id}")
    public Customer deleteCustomerById(@PathVariable long id) {
        return customerService.deleteById(id);
    }

    @PutMapping("/customer/{id}&{currency}")
    public Customer createCustomerAccount(@PathVariable long id, @PathVariable String currency) {
        long accountId = accountService.createAccount(id, currency).getId();
        log.info("Account id: " + accountId);
        Customer customer = customerService.addAccount(id, accountId);
        log.info("New account for " + customer);
        return customer;
    }

    @DeleteMapping("/customer/modify/{id}")
    public List<Long> deleteCustomerAccount(@PathVariable long id) {
        Account account = accountService.getOne(id);
        accountService.modifyAccounts(id);
        return customerService.deleteAccount(account);
    }
}
