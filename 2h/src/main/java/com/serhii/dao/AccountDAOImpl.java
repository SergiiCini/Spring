package com.serhii.dao;

import com.serhii.entity.Account;
import com.serhii.entity.TransactionData;
import com.serhii.exception_handling.NoSuchAccountException;
import com.serhii.exception_handling.OutOfBalanceException;
import com.serhii.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Component
@RequiredArgsConstructor
public class AccountDAOImpl implements AccountDAO {

    //    public List<Account> accounts = new ArrayList<>();
    private final AccountRepository accountRepository;

    public Account save(Account account) {
        Account newAccount = accountRepository.save(account);
        log.info(newAccount + " was successfully added to DB!");
        return newAccount;
    }

    public void delete(Account account) {
        accountRepository.delete(account);
    }

    public void deleteAll(List<Account> entities) {
        accountRepository.deleteAll(entities);
        log.info(entities + " was successfully removed from DB!");
    }

    public void saveAll(List<Account> entities) {
        accountRepository.saveAll(entities);
        log.info(entities + " was successfully added to DB!");
    }

    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    public void deleteById(long id) {
        accountRepository.deleteById(id);
    }

    public Account getOne(long id) {
        Optional <Account> account = accountRepository.findById(id);
        boolean exist = account.isPresent();
        if(exist) return account.get();
        else throw new NoSuchAccountException("Account with id:" + id + " doesn't exist!");
    }

    public Account createAccount(long id, String currency) {
        Account account = new Account();
        account.setAccountOwnerId(id);
        account.setCurrency(currency);
        accountRepository.save(account);
        log.info("New account: " + account);
        return account;
    }

    public List<Account> modifyAccounts(long accountId) {
        List<Account> accounts = accountRepository.findAll();
        Account account = accounts.stream().filter(a -> a.getId().equals(accountId)).findFirst().get();
        long customerId = account.getAccountOwnerId();
        if (account == null)
            throw new NoSuchAccountException("There is no such account in our Database");
        accounts.remove(account);
        return accounts.stream().filter(a -> a.getAccountOwnerId().equals(customerId)).collect(Collectors.toList());

    }

    public Account topUpAccount(TransactionData td) {
        List<Account> accounts = accountRepository.findAll();
        Account account = accounts.stream().filter(a -> a.getNumber().equals(td.getAccountToReceive())).findFirst().get();
        double availableAmount = account.getBalance();
        account.setBalance(availableAmount + td.getTransactionAmount());
        return account;
    }

    public Account withdrawMoney(TransactionData td) {
        List<Account> accounts = accountRepository.findAll();
        Account account = accounts.stream().filter(a -> a.getNumber().equals(td.getAccountToWithdraw())).findFirst().get();
        double availableAmount = account.getBalance();
        if (availableAmount < td.getTransactionAmount())
            throw new OutOfBalanceException("There is not enough money on your account!");
        account.setBalance(availableAmount - td.getTransactionAmount());
        return account;
    }

    public List<Account> sendMoney(TransactionData td) {
        List<Account> accounts = accountRepository.findAll();
        double availableAmount = accounts.stream().filter(a -> a.getNumber().equals(td.getAccountToWithdraw())).findFirst().get().getBalance();
        if (availableAmount < td.getTransactionAmount())
            throw new OutOfBalanceException("There is not enough money on your account!");
        withdrawMoney(td);
        topUpAccount(td);
        return accounts;
    }

    public List<Account> getCustomerAccounts(long customerId) {
        List<Account> accounts = accountRepository.findAll();
        return accounts.stream()
                .filter(a -> a.getAccountOwnerId() == customerId)
                .collect(Collectors.toList());
    }

}
