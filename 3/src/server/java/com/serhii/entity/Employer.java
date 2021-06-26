package com.serhii.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Override
    public String toString() {
        return "Employer{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}
