package com.serhii.controller;

import com.serhii.entity.Account;
import com.serhii.entity.TransactionData;
import com.serhii.exception_handling.NoSuchAccountException;
import com.serhii.service.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class AccountController {

    @Autowired
    AccountService accountService;

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
}
