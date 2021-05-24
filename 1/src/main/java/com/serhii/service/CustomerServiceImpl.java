package com.serhii.service;

import com.serhii.dao.CustomerDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService{

    private CustomerDAO customerDAO;

    @Override
    public int generateCustomerId() {
        return customerDAO.generateCustomerId();
    }
}
