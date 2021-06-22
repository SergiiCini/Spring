package com.serhii.service;

import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import com.serhii.entity.Employer;
import com.serhii.exception_handling.NoSuchCustomerException;
import com.serhii.repository.AccountRepository;
import com.serhii.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private final AccountRepository accountRepository;

    @Autowired
    private final CustomerRepository customerRepository;

    @Override
    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @Override
    public Customer deleteById(long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isPresent()) {
            List<Account> customerAccounts = accountRepository.findAccountsByCustomerId(id);
            for(Account a: customerAccounts) accountRepository.delete(a);
            customerRepository.delete(customer.get());
            return customer.get();
        } else throw new NoSuchCustomerException("No customer with id: " + id);
    }

    @Override
    public Customer getOne(long id) {
        return customerRepository.getOne(id);
    }

    @Override
    public Customer modify(long id, Customer customer) {
        Optional<Customer> curCustomer = customerRepository.findById(id);
        if(curCustomer.isPresent()){
            curCustomer.get().setName(customer.getName());
            curCustomer.get().setAge(customer.getAge());
            curCustomer.get().setEmail(customer.getEmail());
            customerRepository.save(curCustomer.get());
            return curCustomer.get();
        } else throw new NoSuchCustomerException("No customer with id: " + id);
    }

    @Override
    public Customer addAccount(long customerId, Account account) {
        Optional<Customer> customer = customerRepository.findById(customerId);
        if (customer.isPresent()) {
            customer.get().addAccount(account);
            customerRepository.save(customer.get());
        } else throw new NoSuchCustomerException("No customer with id: " + customerId);
        return customer.get();
    }

    @Override
    public Customer addEmployer(long customerId, Employer employer) {
        Optional <Customer> customer = customerRepository.findById(customerId);
        if(customer.isPresent()){
            customer.get().addEmployer(employer);
            customerRepository.save(customer.get());
        } else throw new NoSuchCustomerException("No customer with id: " + customerId);
        return customer.get();
    }


}
