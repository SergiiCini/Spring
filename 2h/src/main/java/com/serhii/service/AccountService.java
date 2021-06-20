package com.serhii.service;

import com.serhii.entity.Account;
import com.serhii.entity.TransactionData;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AccountService {

    public Account save(Account account);

    public void delete(Account account);

    public List<Account> findAll();

    public void deleteById(Long id);

    public Account getOne(long id);

    public Account createAccount(long id, String currency);

    public Account topUpAccount(TransactionData td);

    public Account withdrawMoney(TransactionData td);

    public List<Account> sendMoney(TransactionData td);

    public List<Account> getCustomerAccounts(long customerId);

}
