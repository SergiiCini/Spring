package com.serhii.dto;

import com.serhii.entity.Account;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class AccountDtoResponse {

   private final ModelMapper modelMapper;

    public AccountDtoResponse() {
        this.modelMapper = new ModelMapper();
    }

    public AccountDto convertToDto(Account account){
        return modelMapper.map(account, AccountDto.class);
    }
}
