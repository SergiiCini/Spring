package com.serhii.dao;

import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import com.serhii.entity.TransactionData;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

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
        log.info("DB " + accounts.toString());
        return account;
    }

    @Override
    public boolean delete(Account account) {
        return Optional.of(accounts.remove(account)).orElse(false);
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
    public Account createAccount(long id) {
        Account account = new Account();
        account.setId(generateId());
        account.setAccountOwnerId(id);
        accounts.add(account);
        return account;
    }

    @Override
    public boolean modifyAccounts(Customer customer, String number) {
        Optional<List<Account>> accounts = Optional.ofNullable(customer.getAccounts());
        Account account = accounts.get().stream()
                .filter(a -> a.getNumber().equals(number))
                .findFirst().get();
        accounts.get().remove(account);
        return true;
    }

    @Override
    public void topUpAccount(TransactionData td) {
        double availableAmount = accounts.stream().filter(a -> a.getNumber().equals(td.getAccountToReceive())).findFirst().get().getBalance();
        accounts.stream().filter(a -> a.getNumber().equals(td.getAccountToReceive())).findFirst().get().setBalance(availableAmount + td.getTransactionAmount());
    }

    @Override
    public boolean withdrawMoney(TransactionData td) {
        double availableAmount = accounts.stream().filter(a -> a.getNumber().equals(td.getAccountToWithdraw())).findFirst().get().getBalance();
        if (availableAmount >= td.getTransactionAmount()) {
            accounts.stream().filter(a -> a.getNumber().equals(td.getAccountToWithdraw())).findFirst().get().setBalance(availableAmount - td.getTransactionAmount());
            return true;
        } else return false;
    }

    @Override
    public boolean sendMoney(TransactionData td) {
        double availableAmount = accounts.stream().filter(a -> a.getNumber().equals(td.getAccountToWithdraw())).findFirst().get().getBalance();
        if (availableAmount >= td.getTransactionAmount()){
            withdrawMoney(td);
            topUpAccount(td);
            return true;
        }
            return false;
    }

}
