package com.skbbank.backend.transaction.admin.dto;

import com.skbbank.backend.transaction.enums.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AdminTransactionResponse {

    private Long id;

    private TransactionType transactionType;

    private BigDecimal amount;

    private String accountNumber;

    private String customerName;

    private LocalDateTime createdAt;

    public AdminTransactionResponse(
            Long id,
            TransactionType transactionType,
            BigDecimal amount,
            String accountNumber,
            String customerName,
            LocalDateTime createdAt
    ){
            this.id = id;
            this.transactionType = transactionType;
            this.amount = amount;
            this.accountNumber = accountNumber;
            this.customerName = customerName;
            this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
