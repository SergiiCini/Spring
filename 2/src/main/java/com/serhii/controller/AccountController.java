package com.serhii.controller;

import com.serhii.entity.Account;
import com.serhii.entity.Customer;
import com.serhii.entity.TransactionData;
import com.serhii.exception_handling.NoSuchAccountException;
import com.serhii.exception_handling.OutOfBalanceException;
import com.serhii.service.AccountService;
import com.serhii.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Log4j2
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final CustomerService customerService;

    @GetMapping("/account/")
    public List<Account> getAllAccounts() {
        return accountService.findAll();
    }

    @GetMapping("/account/{id}")
    public List<Account> getCustomerAccount(@PathVariable long id) {
        return accountService.getCustomerAccounts(id);
    }

    @PutMapping("/account/top_up")
    public Account topUpAccount(@RequestBody TransactionData td) {
        Account account = accountService.topUpAccount(td);
        if (account == null)
            throw new NoSuchAccountException("There is no such account to top-up in Database");
        return account;
    }

    @PutMapping("/account/withdraw")
    public Account withdrawMoney(@RequestBody TransactionData td) {
        Account account = accountService.withdrawMoney(td);
        if (account == null)
            throw new NoSuchAccountException("There is no such account to withdraw in Database");
        return account;
    }

    @PutMapping("/account/send_money")
    public ResponseEntity<?> sendMoney(@RequestBody TransactionData td) {
        Optional<Account> senderAccount = accountService.findAll().stream().filter(a -> a.getNumber().equals(td.getAccountToWithdraw())).findFirst();
        if (!senderAccount.isPresent()) return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        Optional <Account> receiverAccount = accountService.findAll().stream().filter(a -> a.getNumber().equals(td.getAccountToReceive())).findFirst();
        double senderBalance = senderAccount.get().getBalance();
        if (!receiverAccount.isPresent()) return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        else if (senderBalance < td.getTransactionAmount()) return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).build();
        else return ResponseEntity.status(HttpStatus.OK).body(accountService.sendMoney(td));
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Incorrect account data")
    @ExceptionHandler(NoSuchAccountException.class)
    public String handleAccountException(NoSuchAccountException ex) {
        return ex.getMessage();
    }

    @ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE, reason = "Not enough money")
    @ExceptionHandler(OutOfBalanceException.class)
    public String handleBalanceException(NoSuchAccountException ex) {
        return ex.getMessage();
    }

    @DeleteMapping("/account/{id}")
    public List<Account> deleteAccount(@PathVariable long id) {
        Customer customer = customerService.getCustomerByAccountId(id);
        if (customer == null)
            throw new NoSuchAccountException("There is no such account to delete in Database");
        return accountService.modifyAccounts(id);
    }
}
