package com.serhii.entity;

import com.serhii.additionals.Currency;

import java.util.UUID;

public class Account {

    private Long id;
    private String number;
    private Double balance;


    public Account(Long id, Double balance) {
        this.id = id;
        this.number = UUID.randomUUID().toString();
        this.balance = balance;
    }

    public Account(Currency currency, Customer customer) {

    }
}
