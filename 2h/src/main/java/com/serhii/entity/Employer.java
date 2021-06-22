package com.serhii.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "Employer")
@Table(name = "employer")
public class Employer extends AbstractEntity {

    @Column(name = "id")
    private Long id;

    @Column(name = "e_name",
    nullable = false)
    private String name;

    @Column(name = "e_address",
    nullable = false)
    private String address;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "employers_customers",
            joinColumns = {@JoinColumn(name = "employer_id", foreignKey = @ForeignKey(name = "emp_cus_employer_id_fk"), referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "customer_id", foreignKey = @ForeignKey(name = "emp_cus_customer_id_fk"), referencedColumnName = "id")})
    private List<Customer> customers = new ArrayList<>();

    public Employer() {
    }

    public Employer(String name, String address) {
        this.name = name;
        this.address = address;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<Customer> getCustomers() {
        return customers;
    }

    public void setCustomers(List<Customer> customers) {
        this.customers = customers;
    }

    @Override
    public String toString() {
        return "Employer{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}
