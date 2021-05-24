package com.serhii.controller;

import com.serhii.service.AccountService;
import com.serhii.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AppController {

    private AccountService accountService;
    private CustomerService customerService;

    @RequestMapping("/")
    public String hello() {
        return "Hello World";
    }
}
