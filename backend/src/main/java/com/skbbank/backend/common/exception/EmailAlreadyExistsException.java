package com.skbbank.backend.common.exception;

public class EmailAlreadyExistsException extends RuntimeException{

    public EmailAlreadyExistsException(){
        super("Email already exists");
    }
}
