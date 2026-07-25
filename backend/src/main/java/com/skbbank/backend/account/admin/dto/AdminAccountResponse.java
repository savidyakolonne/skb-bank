package com.skbbank.backend.account.admin.dto;

import com.skbbank.backend.account.enums.AccountStatus;
import com.skbbank.backend.account.enums.AccountType;

import java.math.BigDecimal;

public class AdminAccountResponse {

    private Long id;

    private String accountNumber;

    private String ownerName;

    private AccountType accountType;

    private BigDecimal balance;

    private AccountStatus status;

    public AdminAccountResponse(){
    }

    public AdminAccountResponse(
            Long id,
            String accountNumber,
            String ownerName,
            AccountType accountType,
            BigDecimal balance,
            AccountStatus status
    ){
        this.id = id;
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.accountType = accountType;
        this.balance = balance;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public AccountStatus getStatus() {
        return status;
    }

    public void setStatus(AccountStatus status) {
        this.status = status;
    }
}
