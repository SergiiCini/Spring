package com.serhii.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "Customers")
@Table(name = "customers")
public class Customer extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "c_name")
    private String name;

    @Column(name = "c_email")
    private String email;

    @Column(name = "c_age")
    private Integer age;

    @OneToMany(mappedBy = "customer",
            orphanRemoval = true,
            cascade = CascadeType.ALL)
    private List<Account> accounts = new ArrayList<>();

    @ManyToMany(mappedBy = "customers",
            cascade = CascadeType.ALL)
    private List<Employer> employers = new ArrayList<>();

    public Customer() {
    }

    public Customer(Long id, String name, String email, Integer age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
    }

    public void addAccount(Account account) {
        if (!this.accounts.contains(account)) {
            this.accounts.add(account);
            account.setCustomer(this);
        }
    }

    public void addEmployer(Employer employer){
        if(!this.employers.contains(employer))
        employers.add(employer);
        employer.getCustomers().add(this);
    }

    public void removeEmployer(Employer employer){
        employers.remove(employer);
        employer.getCustomers().remove(this);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }

    public List<Employer> getEmployers() {
        return employers;
    }

    public void setEmployers(List<Employer> employers) {
        this.employers = employers;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", age=" + age +
                '}';
    }
}
