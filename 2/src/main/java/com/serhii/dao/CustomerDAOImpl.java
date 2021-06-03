package com.serhii.dao;

import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Log4j2
@Component
public class CustomerDAOImpl implements CustomerDAO {

    public AtomicLong id = new AtomicLong(0);
    public List<Customer> customers = new ArrayList<>();

    @Override
    public long generateId() {
        return id.incrementAndGet();
    }

    @Override
    public Customer save(Customer customer) {
        customer.setId(generateId());
        customers.add(customer);
        log.info(customer + " was successfully added to DB!");
        log.info("DB " + customers.toString());
        return customer;
    }

    @Override
    public Customer delete(Customer customer) {
        customers.remove(customer);
        return customer;
    }

    @Override
    public void deleteAll(List<Customer> entities) {
        entities.removeAll(customers);
        log.info(entities + " was successfully removed from DB!");
    }

    @Override
    public void saveAll(List<Customer> entities) {
        customers.addAll(entities);
        log.info(entities + " was successfully added to DB!");
    }

    @Override
    public List<Customer> findAll() {
        return customers;
    }

    @Override
    public Customer deleteById(long id) {
        Customer customer = getOne(id);
        customers.remove(customer);
        log.info("Customer with id=" + id + " was successfully removed from DB!");
        return customer;
    }

    @Override
    public Customer getOne(long id) {
        List<Customer> currentCustomer = customers.stream()
                .filter(c -> c.getId() == id)
                .collect(Collectors.toList());
        return currentCustomer.get(0);
    }

    @Override
    public Customer modify(long id, Customer customer) {
        Customer curCustomer = getOne(id);
        curCustomer.setName(customer.getName());
        curCustomer.setAge(customer.getAge());
        curCustomer.setEmail(customer.getEmail());
        log.info("Customer with id=" + id + " was successfully modifyed!");
        return curCustomer;
    }

    @Override
    public Customer addAccount(long customerId, long accountId) {
        Customer customer = getOne(customerId);
        customer.setAccounts(accountId);
        log.info("Customer with id=" + customerId + " has got a new account!");
        return customer;
    }

    @Override
    public List<Long> deleteAccount(Account account) {
        long customerId = account.getAccountOwnerId();
        long accountId = account.getId();
        Customer customer = customers.stream().filter(c -> c.getId() == customerId).findFirst().get();
        customer.getAccounts().remove(accountId);
        log.info("Customer accounts id: " + customer.getAccounts());
        return customer.getAccounts();
    }

    @Override
    public Customer getCustomerByAccountId(long id) {
        Customer customer = customers.stream().filter(c -> (c.getAccounts().stream().anyMatch(a -> a == id))).findFirst().get();
        log.info("Customer with account to delete: " + customer + ", id: " + id + " " + customer.getAccounts());
        customer.getAccounts().remove(id);
        return customer;
    }
}
