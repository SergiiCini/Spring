package com.serhii.dto;

import com.serhii.entity.Customer;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CustomerDtoResponse {

    private final ModelMapper modelMapper;

    public CustomerDtoResponse() {
        this.modelMapper = new ModelMapper();
    }

    public CustomerDto convertToDto(Customer customer) {
        return modelMapper.map(customer, CustomerDto.class);
    }
}
