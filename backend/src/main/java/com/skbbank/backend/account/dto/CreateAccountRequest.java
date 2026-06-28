package com.skbbank.backend.account.dto;

import lombok.Data;

@Data
public class CreateAccountRequest {

    private Long userId;

    private String accountType;
}
