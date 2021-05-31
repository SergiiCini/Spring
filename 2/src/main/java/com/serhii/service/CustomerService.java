package com.serhii.service;

import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CustomerService {

    public long generateId();

    public Customer save(Customer customer);

    public boolean delete(Customer customer);

    public void deleteAll(List<Customer> entities);

    public void saveAll(List<Customer> entities);

    public List<Customer> findAll();

    public boolean deleteById(long id);

    public Customer getOne(long id);

    public Customer modify(long id, Customer customer);

}
