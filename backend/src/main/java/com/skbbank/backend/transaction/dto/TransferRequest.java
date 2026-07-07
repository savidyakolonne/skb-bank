package com.skbbank.backend.transaction.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class TransferRequest {

    @NotNull(message = "Sender account ID is required")
    private Long fromAccountId;

    @NotNull(message = "Receiver account ID is required")
    private Long toAccountId;

    @NotNull(message = "Transfer amount is required")
    @Positive(message = "Transfer amount must be greater then zero")
    private BigDecimal amount;

    private String description;
}
