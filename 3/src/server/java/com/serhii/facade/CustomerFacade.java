package com.serhii.facade;

import com.serhii.dto.CustomerDtoReq;
import com.serhii.dto.CustomerDtoRes;
import com.serhii.entity.Customer;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CustomerFacade {

    private final ModelMapper modelMapper;

    public CustomerFacade() {
        this.modelMapper = new ModelMapper();
    }

    public CustomerDtoRes convertToDto(Customer customer) { return modelMapper.map(customer, CustomerDtoRes.class);}

    public Customer convertToEntity(CustomerDtoReq customerDtoReq) { return modelMapper.map(customerDtoReq, Customer.class);}

}
