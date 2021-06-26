package com.serhii.service;

import com.serhii.entity.Account;
import com.serhii.entity.TransactionData;
import com.serhii.exception_handling.OutOfBalanceException;
import com.serhii.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    @Autowired
    private final AccountRepository accountRepository;

    @Override
    public Account save(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public void delete(Account account) {
        accountRepository.delete(account);
    }

    @Override
    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        accountRepository.deleteById(id);
    }

    @Override
    public Account getOne(long id) {
        return accountRepository.getOne(id);
    }

    @Override
    public Account createAccount(long id, String currency) {
        Account account = new Account();
        account.setCurrency(currency);
        return account;
    }

    @Override
    public Account topUpAccount(TransactionData td) {
        List<Account> accounts = accountRepository.findAll();
        Account account = accounts.stream().filter(a -> a.getNumber().equals(td.getAccountToReceive())).findFirst().get();
        double availableAmount = account.getBalance();
        account.setBalance(availableAmount + td.getTransactionAmount());
        accountRepository.save(account);
        return account;
    }

    @Override
    public Account withdrawMoney(TransactionData td) {
        List<Account> accounts = accountRepository.findAll();
        Account account = accounts.stream().filter(a -> a.getNumber().equals(td.getAccountToWithdraw())).findFirst().get();
        double availableAmount = account.getBalance();
        if (availableAmount < td.getTransactionAmount())
            throw new OutOfBalanceException("There is not enough money on your account!");
        account.setBalance(availableAmount - td.getTransactionAmount());
        accountRepository.save(account);
        return account;
    }
    @Override
    public List<Account> sendMoney(TransactionData td) {
        List<Account> accounts = accountRepository.findAll();
        double availableAmount = accounts.stream().filter(a -> a.getNumber().equals(td.getAccountToWithdraw())).findFirst().get().getBalance();
        if (availableAmount < td.getTransactionAmount())
            throw new OutOfBalanceException("There is not enough money on your account!");
        withdrawMoney(td);
        topUpAccount(td);
        return accounts;
    }

    @Override
    public List<Account> getCustomerAccounts(long customerId) {
        return accountRepository.findAccountsByCustomerId(customerId);
    }
}
