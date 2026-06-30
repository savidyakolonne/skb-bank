package com.skbbank.backend.common.exception;

public class AccountNotFoundException extends RuntimeException{

    public AccountNotFoundException(){
        super("Account not found");
    }
}
