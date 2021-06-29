package com.serhii.dto;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class EmployerDtoReq {
    private Long id;
    @Size(min = 2, message = "Employer name must have more than 2 characters!")
    private String name;
    @Size(min = 2, message = "Employer address must have more than 2 characters!")
    private String address;
}
