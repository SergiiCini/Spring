package com.serhii.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "Customers")
@Table(name = "customers")
public class Customer extends AbstractEntity {

    @Column(name = "id")
    private Long id;

    @Column(name = "c_name")
    private String name;

    @Column(name = "c_email")
    private String email;

    @Column(name = "c_age")
    private Integer age;

    @Column(name = "password")
    private String password;

    @Column(name = "c_cell_number")
    private int cellNumber;

    @OneToMany(mappedBy = "customer",
            orphanRemoval = true,
            cascade = CascadeType.ALL)
    private List<Account> accounts = new ArrayList<>();

    @ManyToMany(mappedBy = "customers",
            cascade = CascadeType.ALL)
    private List<Employer> employers = new ArrayList<>();

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
