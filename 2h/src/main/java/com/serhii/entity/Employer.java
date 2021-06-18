package com.serhii.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
public class Employer extends AbstractEntity {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "e_id")
   private Long id;
   @Column(name = "c_name")
   private String name;
   @Column(name = "a_address")
   private String address;
}
