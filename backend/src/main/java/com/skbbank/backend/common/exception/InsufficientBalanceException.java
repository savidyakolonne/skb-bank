package com.skbbank.backend.common.exception;

public class InsufficientBalanceException extends RuntimeException{

    public InsufficientBalanceException(){
        super("Insufficient balance");
    }
}
