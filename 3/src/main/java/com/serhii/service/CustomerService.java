package com.serhii.service;

import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import com.serhii.entity.Employer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CustomerService {

    public Customer save(Customer customer);

    public List<Customer> findAll();

    public Customer deleteById(long id);

    public Customer getOne(long id);

    public Customer modify(long id, Customer customer);

    public Customer addAccount(long customerId, Account account);

    public Customer addEmployer(long customerId, Employer employer);
}
