package com.serhii.exception_handling;

public class NoSuchCurrencyHandler extends RuntimeException {

    public NoSuchCurrencyHandler(String message) {
        super(message);
    }
}

