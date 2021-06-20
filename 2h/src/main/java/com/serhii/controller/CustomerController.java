package com.serhii.controller;

import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import com.serhii.entity.Employer;
import com.serhii.exception_handling.NoSuchCustomerException;
import com.serhii.service.AccountService;
import com.serhii.service.CustomerService;
import com.serhii.service.EmployerService;
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

    private EmployerService employerService;

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

    @PostMapping("/customer/new_employer_{id}")
    public List<Employer> addNewEmployer(@PathVariable long id, @RequestBody Employer employer) {
        customerService.addEmployer(id, employer);
        log.info("Employer: " + employer + " was successfully added to DB!");
        Customer customer = customerService.getOne(id);
        List<Employer> allCustomerEmployers = customer.getEmployers();
        log.info("Customer accounts: " + allCustomerEmployers);
        return allCustomerEmployers;
    }
}
