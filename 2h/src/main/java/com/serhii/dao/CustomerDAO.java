package com.serhii.dao;

import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Repository
public interface CustomerDAO {

    public Customer save(Customer customer);

//    public Customer delete(Customer customer);

    public void deleteAll(List<Customer> entities);

    public void saveAll(List<Customer> entities);

    public List<Customer> findAll();

//    public Customer deleteById(long id);

    public Customer getOne(long id);

    public Customer modify (long id, Customer customer);

    public Customer addAccount(long customerId, Account account);

    public List<Account> deleteAccount(Account account);

    public Customer getCustomerByAccountId(long id);

}
