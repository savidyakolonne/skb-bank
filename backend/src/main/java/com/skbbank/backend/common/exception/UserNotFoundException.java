package com.skbbank.backend.common.exception;

public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException(){
        super("User not found");
    }
}
