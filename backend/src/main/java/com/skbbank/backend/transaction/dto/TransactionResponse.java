package com.skbbank.backend.transaction.dto;

import com.skbbank.backend.transaction.enums.TransactionType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TransactionResponse {

    private Long id;

    private Long accountId;

    private String ownerName;

    private String username;

    private String accountNumber;

    private BigDecimal amount;

    private TransactionType transactionType;

    private String description;

    private LocalDateTime createdAt;
}
