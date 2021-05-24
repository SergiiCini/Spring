package com.serhii.service;

import com.serhii.additionals.Currency;
import com.serhii.dao.AccountDAO;
import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import com.serhii.entity.TransactionData;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountDAO accountDAO;

    @Override
    public long generateId() { return accountDAO.generateId();}

    @Override
    public Account save(Account account) {
        return accountDAO.save(account);
    }

    @Override
    public boolean delete(Account account) {
        return accountDAO.delete(account);
    }

    @Override
    public void deleteAll(List<Account> entities) {
        accountDAO.deleteAll(entities);
    }

    @Override
    public void saveAll(List<Account> entities) {
        accountDAO.saveAll(entities);
    }

    @Override
    public List<Account> findAll() {
        return accountDAO.findAll();
    }

    @Override
    public boolean deleteById(long id) {
        return accountDAO.deleteById(id);
    }

    @Override
    public Account getOne(long id) {
        return accountDAO.getOne(id);
    }

    @Override
    public Account createAccount(long id) {
        return accountDAO.createAccount(id);
    }

    @Override
    public boolean modifyAccounts(Customer customer, String number) {
        return accountDAO.modifyAccounts(customer, number);
    }

//    @Override
//    public void topUpAccount(String number, double topUpAmount) {
//        accountDAO.topUpAccount(number, topUpAmount);
//    }
    @Override
    public void topUpAccount(TransactionData td) {
        accountDAO.topUpAccount(td);
    }

    @Override
    public boolean withdrawMoney(TransactionData td) {
       return accountDAO.withdrawMoney(td);
    }
    @Override
    public boolean sendMoney(TransactionData td) {
        return accountDAO.sendMoney(td);
    }
}
