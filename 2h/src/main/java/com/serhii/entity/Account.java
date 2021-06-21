package com.serhii.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.serhii.exception_handling.NoSuchAccountException;

import javax.persistence.*;
import java.util.Objects;
import java.util.UUID;

@Entity(name = "Accounts")
@Table(name = "accounts")
public class Account extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Account)) return false;
        Account account = (Account) o;
        return Double.compare(account.balance, balance) == 0 && Objects.equals(id, account.id) && Objects.equals(number, account.number) && currency == account.currency && Objects.equals(customer, account.customer);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, number, currency, balance, customer);
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
