package com.serhii.dao;

import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import com.serhii.exception_handling.NoSuchCustomerException;
import com.serhii.repository.AccountRepository;
import com.serhii.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Log4j2
@Component
@RequiredArgsConstructor
public class CustomerDAOImpl implements CustomerDAO {

    private final CustomerRepository customerRepository;
    private final AccountRepository accountRepository;

//    public List<Customer> customers = new ArrayList<>();

    @Override
    public Customer save(Customer customer) {
        customerRepository.save(customer);
        return customerRepository.save(customer);
    }

//    @Override
//    public Customer delete(Customer customer) {
//        Long customerId = customer.getId();
//        List<Account> customerAccounts = accountRepository.findAccountsByAccountOwnerId(customerId);
//        for(Account a: customerAccounts) customer.removeAccount(a);
//        customerRepository.delete(customer);
//        log.info(customer + " was successfully removed from DB");
//        return customer;
//    }

    @Override
    public void deleteAll(List<Customer> entities) {
        customerRepository.deleteAll(entities);
        log.info(entities + " was successfully removed from DB!");
    }

    @Override
    public void saveAll(List<Customer> entities) {
        customerRepository.saveAll(entities);
        log.info(entities + " was successfully added to DB!");
    }

    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

//    @Override
//    public Customer deleteById(long id) {
//        Customer customer = customerRepository.findById(id).get();
//        List<Account> customerAccounts = accountRepository.findAccountsByAccountOwnerId(id);
//        for(Account a: customerAccounts) customer.removeAccount(a);
//        customerRepository.deleteById(id);
//        log.info("Customer with id=" + id + " was successfully removed from DB!");
//        return customer;
//    }

    @Override
    public Customer getOne(long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        System.out.println("Customer: " + customer.get());
        if(customer.isPresent()) return customer.get();
        else throw new NoSuchCustomerException("Customer with id: " + id + " doesn't exist in DB!");
    }

    @Override
    public Customer modify(long id, Customer customer) {
        Optional<Customer> curCustomer = customerRepository.findById(id);
        if(curCustomer.isPresent()) {
            curCustomer.get().setName(customer.getName());
            curCustomer.get().setAge(customer.getAge());
            curCustomer.get().setEmail(customer.getEmail());
        } else throw new NoSuchCustomerException("Customer with id=" + id +  " doesn't exist in DB!");
//        Customer modCustomer = customerRepository.updateCustomerData(id, customer.getName(), customer.getAge(), customer.getEmail());
        log.info("Customer with id=" + id + " was successfully modified!");
        return curCustomer.get();
    }

    @Override
    public Customer addAccount(long customerId, Account account) {
        Optional<Customer> customer = customerRepository.findById(customerId);
//        List<Account> accounts = accountRepository.findAccountsByAccountOwnerId(customerId);
        if(customer.isPresent()) {
            customer.get().addAccount(account);
        } else throw new NoSuchCustomerException("Customer with id= " + customerId + " doesn't exist in DB!");
        log.info("Customer with id=" + customerId + " has got a new account!");
        return customer.get();
    }

    @Override
    public List<Account> deleteAccount(Account account) {
        List<Customer> customers = customerRepository.findAll();
        long customerId = account.getAccountOwnerId();
        long accountId = account.getId();
        Customer customer = customers.stream().filter(c -> c.getId() == customerId).findFirst().get();
        customer.getAccounts().remove(accountId);
        log.info("Customer accounts id: " + customer.getAccounts());
        return customer.getAccounts();
    }

    @Override
    public Customer getCustomerByAccountId(long id) {
//        List<Customer> customers = customerRepository.findAll();
        Customer customer = customerRepository.getCustomerByAccountsEquals(id);
//        Customer customer = customers.stream().filter(c -> (c.getAccounts().stream().anyMatch(a -> a.getId() == id))).findFirst().get();
        log.info("Customer with account to delete: " + customer + ", id: " + id + " " + customer.getAccounts());
        customer.getAccounts().remove(id);
        return customer;
    }
}
