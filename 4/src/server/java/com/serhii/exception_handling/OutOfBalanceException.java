package com.serhii.exception_handling;

public class OutOfBalanceException extends RuntimeException{

    public OutOfBalanceException(String message){
        super(message);
    }
}
