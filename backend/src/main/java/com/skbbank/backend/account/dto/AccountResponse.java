package com.skbbank.backend.account.dto;

import com.skbbank.backend.account.enums.AccountStatus;
import com.skbbank.backend.account.enums.AccountType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class AccountResponse {

    private Long id;

    private String accountNumber;

    private AccountType accountType;

    private BigDecimal balance;

    private AccountStatus status;

    private LocalDateTime createdAt;

}
