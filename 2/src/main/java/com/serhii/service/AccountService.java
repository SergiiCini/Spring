package com.serhii.service;

import com.serhii.additionals.Currency;
import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import com.serhii.entity.TransactionData;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface AccountService {

    public long generateId();

    public Account save(Account account);

    public boolean delete(Account account);

    public void deleteAll(List<Account> entities);

    public void saveAll(List<Account> entities);

    public List<Account> findAll();

    public boolean deleteById(long id);

    public Account getOne(long id);

    public Account createAccount(long id);

    public boolean modifyAccounts(Customer customer, String number);

    public void topUpAccount(TransactionData td);
    public boolean withdrawMoney(TransactionData td);

    public boolean sendMoney(TransactionData td);


}