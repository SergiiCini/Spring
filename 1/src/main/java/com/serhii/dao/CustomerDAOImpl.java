package com.serhii.dao;

import org.springframework.stereotype.Component;

@Component
public class CustomerDAOImpl implements CustomerDAO {

    public int id = 0;

    @Override
    public int generateCustomerId() {
        return id++;
    }
}
