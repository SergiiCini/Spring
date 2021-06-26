package com.serhii.exception_handling;

public class NoSuchAccountException extends RuntimeException {

    public NoSuchAccountException(String message){
        super(message);
    }
}
