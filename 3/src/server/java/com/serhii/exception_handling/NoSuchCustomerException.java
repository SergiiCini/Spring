package com.serhii.exception_handling;

public class NoSuchCustomerException extends RuntimeException {

    public NoSuchCustomerException(String message){
        super(message);
    }
}
