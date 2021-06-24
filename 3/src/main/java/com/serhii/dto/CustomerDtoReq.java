package com.serhii.dto;

import lombok.Data;

import javax.validation.constraints.*;

@Data
public class CustomerDtoReq {
    private Long id;

    @NotNull(message = "Name cannot be null")
    @Size(min = 2, message = "Customer name must have more than 2 characters!")
    private String name;

    @Pattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$", message = "Email should be valid")
    private String email;

    @Min(value = 18, message = "Age should not be less than 18")
    @Max(value = 150, message = "Age should not be greater than 150")
    private String age;
}
