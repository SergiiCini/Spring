package com.serhii.dto;

import com.serhii.entity.Account;
import com.serhii.entity.Employer;
import lombok.Data;

import java.util.List;

@Data
public class CustomerDtoRes {
    private Long id;
    private String name;
    private String email;
    private String cell;
    private String age;
    private List<Account> accounts;
    private List<Employer> employers;
}
