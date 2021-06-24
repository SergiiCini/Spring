package com.serhii.controller;

import com.serhii.dto.CustomerDto;
import com.serhii.dto.CustomerDtoResponse;
import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import com.serhii.entity.Employer;
import com.serhii.exception_handling.NoSuchCustomerException;
import com.serhii.service.AccountService;
import com.serhii.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;
    private final AccountService accountService;
    private final CustomerDtoResponse customerDtoResponse;

    @GetMapping("/customer/{id}")
    public CustomerDto getCustomer(@PathVariable long id) {
        CustomerDto customer = customerDtoResponse.convertToDto(customerService.getOne(id));
        if (customer == null)
            throw new NoSuchCustomerException("There is no such customer in Database");
        return customer;
    }

    @GetMapping("/customer")
    public List<CustomerDto> getAllCustomers() {
        Optional<List<CustomerDto>> customersOpt = Optional.of(customerService.findAll()
                .stream()
                .map(customerDtoResponse::convertToDto)
                .collect(Collectors.toList()));
        System.out.println(customersOpt);
        if (customersOpt.isPresent()) return customersOpt.get();
        else
            throw new NoSuchCustomerException("There is no customers in Database");
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
