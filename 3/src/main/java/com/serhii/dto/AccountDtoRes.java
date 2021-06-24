package com.serhii.dto;

import com.serhii.entity.Currency;
import com.serhii.entity.Customer;
import lombok.Data;

@Data
public class AccountDtoRes {
    private Long id;
    private String number;
    private Currency currency;
    private double balance;
    private Customer customer;
}
