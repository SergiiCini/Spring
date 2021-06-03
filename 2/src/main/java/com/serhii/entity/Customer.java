package com.serhii.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Customer {

    private long id;
    private String name;
    private String email;
    private Integer age;
    private List<Long> accountsId = new ArrayList<>();

    public Customer() {
    }

    public Customer(long id, String name, String email, Integer age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public List<Long> getAccounts() {
        return accountsId;
    }

    public void setAccounts(Long accountId) {
        accountsId.add(accountId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Customer)) return false;
        Customer customer = (Customer) o;
        return id == customer.id && Objects.equals(name, customer.name) && Objects.equals(email, customer.email) && Objects.equals(age, customer.age) && Objects.equals(accountsId, customer.accountsId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, email, age, accountsId);
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", age=" + age +
                ", accountsId=" + accountsId +
                '}';
    }
}
