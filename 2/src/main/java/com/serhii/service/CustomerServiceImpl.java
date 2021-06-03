package com.serhii.service;

import com.serhii.dao.CustomerDAO;
import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerDAO customerDAO;

    @Override
    public long generateId() {
        return customerDAO.generateId();
    }

    @Override
    public Customer save(Customer customer) {
        return customerDAO.save(customer);
    }

    @Override
    public Customer delete(Customer customer) {
        return customerDAO.delete(customer);
    }

    @Override
    public void deleteAll(List<Customer> entities) {
        customerDAO.deleteAll(entities);
    }

    @Override
    public void saveAll(List<Customer> entities) {
        customerDAO.saveAll(entities);
    }

    @Override
    public List<Customer> findAll() {
        return customerDAO.findAll();
    }

    @Override
    public Customer deleteById(long id) {
        return customerDAO.deleteById(id);
    }

    @Override
    public Customer getOne(long id) {
        return customerDAO.getOne(id);
    }

    @Override
    public Customer modify(long id, Customer customer) {
        return customerDAO.modify(id, customer);
    }

    @Override
    public Customer addAccount(long customerId, long accountId) {
        return customerDAO.addAccount(customerId, accountId);
    }

    @Override
    public List<Long> deleteAccount(Account account) {
        return customerDAO.deleteAccount(account);
    }

    @Override
    public Customer getCustomerByAccountId(long id) {
        return customerDAO.getCustomerByAccountId(id);
    }

}
