package com.serhii.controller;

import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import com.serhii.exception_handling.NoSuchAccountException;
import com.serhii.exception_handling.NoSuchCustomerException;
import com.serhii.repository.AccountRepository;
import com.serhii.service.AccountService;
import com.serhii.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountRepository customerRepository;

    @GetMapping("/customer/{id}")
    public Customer getCustomer(@PathVariable long id) {
        Customer customer = customerService.getOne(id);
        if (customer == null)
            throw new NoSuchCustomerException("There is no such customer in Database");
        return customer;
    }

    @GetMapping("/customer")
    public List<Customer> getAllCustomers() {
        List<Customer> customers = customerService.findAll();
        if (customers == null)
            throw new NoSuchCustomerException("There is no customers in Database");
        return customers;
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
    public List<Account> createCustomerAccount(@PathVariable long id, @PathVariable String currency) {
        Account account = accountService.createAccount(id, currency);
        customerService.addAccount(id, account);
        log.info("Account: " + account);
        List<Account> allCustomerAccounts = accountService.getCustomerAccounts(id);
        log.info("Customer accounts: " + allCustomerAccounts);
        return allCustomerAccounts;
    }

//    @DeleteMapping("/customer/modify/{id}")
//    public List<Account> deleteCustomerAccount(@PathVariable long id) {
//        Account account = accountService.getOne(id);
//        accountService.modifyAccounts(id);
//        return customerService.deleteAccount(account);
//    }
}
