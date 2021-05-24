package com.serhii.controller;

import com.serhii.entity.TransactionData;
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
    public String topUpAccount(@RequestBody TransactionData td) {
        accountService.topUpAccount(td);
        return "Account: " + td.getAccountToReceive() + " was toppedUp by " + td.getTransactionAmount();
    }

    @PutMapping("/account/withdraw")
    public String withdrawMoney(@RequestBody TransactionData td) {
        if (!accountService.withdrawMoney(td))
            return "You don't have enough of money on your account!";
        return "Success!";
    }

    @PutMapping("/account/send_money")
    public String sendMoney(@RequestBody TransactionData td) {
        if (!accountService.sendMoney(td))
            return "You don't have enough of money on your account!";
        return "Success!";
    }
}
