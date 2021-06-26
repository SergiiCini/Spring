package com.serhii.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.serhii.exception_handling.NoSuchAccountException;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;
import java.util.UUID;


@EqualsAndHashCode(callSuper = true)
@Entity(name = "Accounts")
@Data
@Table(name = "accounts")
public class Account extends AbstractEntity {

    @Column(name = "id")
    private Long id;
    @Column(name = "a_number", nullable = false)
    private String number;
    @Column(name = "a_currency", nullable = false)
    private Currency currency;
    @Column(name = "a_balance", nullable = false)
    private double balance = 0.0;

    @JsonIgnore
    @ManyToOne
    @JoinTable(name = "acc_owners",
            joinColumns = {@JoinColumn(name = "acc_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "customer_id", referencedColumnName = "id")}
    )
    private Customer customer;

    public Account(Long id, Double balance) {
        this.id = id;
        this.number = UUID.randomUUID().toString();
        this.balance = balance;
    }

    public Account() {
        this.number = UUID.randomUUID().toString();
        this.balance = balance;
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

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", number='" + number + '\'' +
                ", currency=" + currency +
                ", balance=" + balance +
                '}';
    }
}
