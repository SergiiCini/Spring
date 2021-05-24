package com.serhii.dao;

import org.springframework.stereotype.Component;

@Component
public class AccountDAOImpl implements AccountDAO {

    public int id = 0;

    @Override
    public int generateAccountId() {
        return id++;
    }
}
