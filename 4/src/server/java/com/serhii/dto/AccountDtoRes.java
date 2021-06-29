package com.serhii.dto;

import com.serhii.entity.Currency;
import com.serhii.entity.Customer;
import lombok.Data;

import javax.validation.constraints.PositiveOrZero;

@Data
public class AccountDtoRes {
    private Long id;
    private String number;
    private Currency currency;
    @PositiveOrZero(message = "Account balance should be positive!")
    private double balance;
    private Customer customer;
}
