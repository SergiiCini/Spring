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

    public Account createAccount(long id, String currency);

    public List <Account> modifyAccounts(long accountId);

    public Account topUpAccount(TransactionData td);

    public Account withdrawMoney(TransactionData td);

    public List<Account> sendMoney(TransactionData td);

    public List<Account> getCustomerAccounts (long customerId);

}
