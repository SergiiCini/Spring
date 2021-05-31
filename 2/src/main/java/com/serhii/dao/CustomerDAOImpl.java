package com.serhii.dao;

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
    public boolean delete(Customer customer) {
        return Optional.of(customers.remove(customer)).orElse(false);
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
    public boolean deleteById(long id) {
        if (customers.contains(getOne(id))) {
            customers.remove(getOne(id));
            log.info("Customer with id=" + id + " was successfully removed from DB!");
            return true;
        } else {
            log.info("Customer with id=" + id + " is not exist in our DB!");
            return false;
        }
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
}
