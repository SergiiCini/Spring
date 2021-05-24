package com.serhii.service;

import com.serhii.dao.AccountDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private AccountDAO accountDAO;


    @Override
    public int generateAccountId() {
        return accountDAO.generateAccountId();
    }
}
