package com.skbbank.backend.transaction.dto;

import com.skbbank.backend.transaction.enums.TransactionType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TransactionResponse {

    // transaction
    private Long id;
    private BigDecimal amount;
    private TransactionType transactionType;
    private String remarks;
    private String destinationBank;
    private LocalDateTime createdAt;

    // account
    private Long accountId;
    private String accountNumber;

    // customer
    private String ownerName;
    private String username;
}
