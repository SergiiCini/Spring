package com.serhii.facade;

import com.serhii.dto.AccountDtoReq;
import com.serhii.dto.AccountDtoRes;
import com.serhii.entity.Account;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class AccountFacade {

   private final ModelMapper modelMapper;

    public AccountFacade() {
        this.modelMapper = new ModelMapper();
    }

    public AccountDtoRes convertToDto(Account account){
        return modelMapper.map(account, AccountDtoRes.class);
    }

    public Account convertToEntity(AccountDtoReq accountDtoReq) {return modelMapper.map(accountDtoReq, Account.class);}
}
