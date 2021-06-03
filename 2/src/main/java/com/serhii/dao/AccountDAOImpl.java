package com.serhii.dao;

import com.serhii.entity.Account;
import com.serhii.entity.TransactionData;
import com.serhii.exception_handling.NoSuchAccountException;
import com.serhii.exception_handling.OutOfBalanceException;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Log4j2
@Component
public class AccountDAOImpl implements AccountDAO {

    public AtomicLong id = new AtomicLong(0);
    public List<Account> accounts = new ArrayList<>();

    @Override
    public long generateId() {
        return id.incrementAndGet();
    }

    @Override
    public Account save(Account account) {
        account.setId(generateId());
        accounts.add(account);
        log.info(account + " was successfully added to DB!");
        return account;
    }

    @Override
    public boolean delete(Account account) {
        return accounts.remove(account);
    }

    @Override
    public void deleteAll(List<Account> entities) {
        entities.removeAll(accounts);
        log.info(entities + " was successfully removed from DB!");
    }

    @Override
    public void saveAll(List<Account> entities) {
        accounts.addAll(entities);
        log.info(entities + " was successfully added to DB!");
    }

    @Override
    public List<Account> findAll() {
        return accounts;
    }

    @Override
    public boolean deleteById(long id) {
        if (accounts.contains(getOne(id))) {
            accounts.remove(getOne(id));
            log.info("Account with id=" + id + " was successfully added to DB!");
            return true;
        } else {
            log.info("Account with id=" + id + " is not exist in our DB!");
            return false;
        }
    }

    @Override
    public Account getOne(long id) {
        return accounts.stream().filter(a -> a.getId() == id).findFirst().get();
    }

    @Override
    public Account createAccount(long id, String currency) {
        Account account = new Account();
        account.setId(generateId());
        account.setAccountOwnerId(id);
        account.setCurrency(currency);
        accounts.add(account);
        log.info("New account: " + account);
        return account;
    }

    @Override
    public List<Account> modifyAccounts(long accountId) {
        Account account = accounts.stream().filter(a -> a.getId().equals(accountId)).findFirst().get();
        long customerId = account.getAccountOwnerId();
        if (account == null)
            throw new NoSuchAccountException("There is no such account in our Database");
        accounts.remove(account);
        return accounts.stream().filter(a -> a.getAccountOwnerId().equals(customerId)).collect(Collectors.toList());

    }

    @Override
    public Account topUpAccount(TransactionData td) {
        Account account = accounts.stream().filter(a -> a.getNumber().equals(td.getAccountToReceive())).findFirst().get();
        double availableAmount = account.getBalance();
        account.setBalance(availableAmount + td.getTransactionAmount());
        return account;
    }

    @Override
    public Account withdrawMoney(TransactionData td) {
        Account account = accounts.stream().filter(a -> a.getNumber().equals(td.getAccountToWithdraw())).findFirst().get();
        double availableAmount = account.getBalance();
        if (availableAmount < td.getTransactionAmount())
            throw new OutOfBalanceException("There is not enough money on your account!");
        account.setBalance(availableAmount - td.getTransactionAmount());
        return account;
    }

    @Override
    public boolean sendMoney(TransactionData td) {
        double availableAmount = accounts.stream().filter(a -> a.getNumber().equals(td.getAccountToWithdraw())).findFirst().get().getBalance();
        if (availableAmount < td.getTransactionAmount())
            throw new OutOfBalanceException("There is not enough money on your account!");
        withdrawMoney(td);
        topUpAccount(td);
        return true;
    }

    @Override
    public List<Account> getCustomerAccounts(long customerId) {
        return accounts.stream()
                .filter(a -> a.getAccountOwnerId() == customerId)
                .collect(Collectors.toList());
    }

}
