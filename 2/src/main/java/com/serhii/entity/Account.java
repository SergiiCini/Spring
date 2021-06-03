package com.serhii.entity;

import com.serhii.additionals.Currency;
import com.serhii.exception_handling.NoSuchAccountException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

public class Account {

    private Long id;
    private String number;
    private Currency currency;
    private double balance = 0.0;
    private long accountOwnerId;

    public Account(Long id, Double balance) {
        this.id = id;
        this.number = UUID.randomUUID().toString();
        this.balance = balance;
    }

    public Account() {
        this.number = UUID.randomUUID().toString();
        this.balance = balance;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        switch (currency) {
            case "UAH":
                this.currency = Currency.UAH;
                break;
            case "USD":
                this.currency = Currency.USD;
                break;
            case "EUR":
                this.currency = Currency.EUR;
                break;
            case "CHF":
                this.currency = Currency.CHF;
                break;
            case "GBP":
                this.currency = Currency.GBP;
                break;
            default:
                throw new NoSuchAccountException("It's impossible to open account in this currency!");
        }
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public Long getAccountOwnerId() {
        return accountOwnerId;
    }

    public void setAccountOwnerId(long id) {
        this.accountOwnerId = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Account)) return false;
        Account account = (Account) o;
        return Double.compare(account.balance, balance) == 0 && accountOwnerId == account.accountOwnerId && Objects.equals(id, account.id) && Objects.equals(number, account.number) && currency == account.currency;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, number, currency, balance, accountOwnerId);
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", number='" + number + '\'' +
                ", currency=" + currency +
                ", balance=" + balance +
                ", accountOwnerId=" + accountOwnerId +
                '}';
    }
}
