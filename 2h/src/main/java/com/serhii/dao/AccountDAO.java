package com.serhii.dao;

import com.serhii.entity.Account;
import com.serhii.entity.TransactionData;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountDAO {

    public Account save(Account account);

    public void delete(Account account);

    public void deleteAll(List<Account> entities);

    public void saveAll(List<Account> entities);

    public List<Account> findAll();

    public void deleteById(long id);

    public Account getOne(long id);

    public Account createAccount(long id, String currency);

    public List<Account> modifyAccounts(long accountId);

    public Account topUpAccount(TransactionData td);

    public Account withdrawMoney(TransactionData td);

    public List<Account> sendMoney(TransactionData td);

    public List<Account> getCustomerAccounts (long customerId);

}
