package com.skbbank.backend.common.exception;

public class InvalidPasswordException extends RuntimeException {

    public InvalidPasswordException() {
        super("Invalid password");
    }

}