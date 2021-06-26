package com.serhii.controller;

import com.serhii.dto.*;
import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import com.serhii.exception_handling.NoSuchCustomerException;
import com.serhii.facade.AccountFacade;
import com.serhii.facade.CustomerFacade;
import com.serhii.facade.EmployerFacade;
import com.serhii.service.AccountService;
import com.serhii.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    private final CustomerFacade customerFacade;
    private final EmployerFacade employerFacade;
    private  final AccountFacade accountFacade;

    @GetMapping("/customer/{id}")
    public CustomerDtoRes getCustomer(@PathVariable long id) {
        Optional<CustomerDtoRes> customer = Optional.ofNullable(customerFacade.convertToDto(customerService.getOne(id)));
        if(customer.isPresent()) return customer.get();
        else
            throw new NoSuchCustomerException("There is no such customer in Database");
    }

    @GetMapping("/customer")
    public List<CustomerDtoRes> getAllCustomers() {
        Optional<List<CustomerDtoRes>> customersOpt = Optional.of(customerService.findAll()
                .stream()
                .map(customerFacade::convertToDto)
                .collect(Collectors.toList()));
        if (customersOpt.isPresent()) return customersOpt.get();
        else
            throw new NoSuchCustomerException("There is no customers in Database");
    }

    @PostMapping("/customer")
    public CustomerDtoRes createNewCustomer(@RequestBody @Valid CustomerDtoReq customerDtoReq) {
        return customerFacade.convertToDto(customerService.save(customerFacade.convertToEntity(customerDtoReq)));
    }

    @PutMapping("/customer/modify/{id}")
    public CustomerDtoRes updateCustomer(@PathVariable long id, @RequestBody @Valid CustomerDtoReq customerDtoReq) {
        return customerFacade.convertToDto(customerService.modify(id, customerFacade.convertToEntity(customerDtoReq)));
    }

    @DeleteMapping("/customer/{id}")
    public CustomerDtoRes deleteCustomerById(@PathVariable long id) {
        return customerFacade.convertToDto(customerService.deleteById(id));
    }

    @PutMapping("/customer/{id}&{currency}")
    public List<AccountDtoRes> createCustomerAccount(@PathVariable long id, @PathVariable String currency) {
        Account account = accountService.createAccount(id, currency);
        customerService.addAccount(id, account);
        log.info("Account: " + account);
        List<AccountDtoRes> allCustomerAccounts = accountService.getCustomerAccounts(id)
                .stream()
                .map(accountFacade::convertToDto)
                .collect(Collectors.toList());
        log.info("Customer accounts: " + allCustomerAccounts);
        return allCustomerAccounts;
    }

    @PostMapping("/customer/new_employer_{id}")
    public List<EmployerDtoRes> addNewEmployer(@PathVariable long id, @RequestBody EmployerDtoReq employerDtoReq) {
        customerService.addEmployer(id, employerFacade.convertToEntity(employerDtoReq));
        log.info("Employer: " + employerDtoReq + " was successfully added to DB!");
        Customer customer = customerService.getOne(id);
        List<EmployerDtoRes> allCustomerEmployers = customer.getEmployers()
                .stream()
                .map(employerFacade::convertToDto)
                .collect(Collectors.toList());
        log.info("Customer accounts: " + allCustomerEmployers);
        return allCustomerEmployers;
    }
}
