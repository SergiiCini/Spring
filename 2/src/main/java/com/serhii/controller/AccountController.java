package com.serhii.controller;

import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import com.serhii.entity.TransactionData;
import com.serhii.exception_handling.NoSuchAccountException;
import com.serhii.service.AccountService;
import com.serhii.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class AccountController {

    @Autowired
    AccountService accountService;

    @Autowired
    CustomerService customerService;

    @GetMapping("/account/")
    public List<Account> getAllAccounts(){
        return accountService.findAll();
    }

    @GetMapping("/account/{id}")
    public List<Account> getCustomerAccount(@PathVariable long id){
        return accountService.getCustomerAccounts(id);
    }

    @PutMapping("/account/top_up")
    public Account topUpAccount(@RequestBody TransactionData td) {
        Account account = accountService.topUpAccount(td);
        if (account == null)
            throw new NoSuchAccountException("There is no such account in our Database");
        return account;
    }

    @PutMapping("/account/withdraw")
    public Account withdrawMoney(@RequestBody TransactionData td) {
        Account account = accountService.withdrawMoney(td);
        if (account == null)
            throw new NoSuchAccountException("There is no such account in our Database");
        return account;
    }

    @PutMapping("/account/send_money")
    public String sendMoney(@RequestBody TransactionData td) {
        accountService.sendMoney(td);
        return "Success!";
    }

    @DeleteMapping("/account/{id}")
    public List<Account> deleteAccount(@PathVariable long id) {
        Customer customer = customerService.getCustomerByAccountId(id);
        return accountService.modifyAccounts(id);
    }
}
