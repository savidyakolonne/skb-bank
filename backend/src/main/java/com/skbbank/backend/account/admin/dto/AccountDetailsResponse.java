package com.skbbank.backend.account.admin.dto;

import com.skbbank.backend.transaction.dto.TransactionResponse;
import com.skbbank.backend.user.dto.UserResponse;

import java.util.List;

public class AccountDetailsResponse {

    private AdminAccountResponse account;

    private UserResponse owner;

    private List<TransactionResponse> recentTransactions;

    public AccountDetailsResponse() {
    }

    public AccountDetailsResponse(
            AdminAccountResponse account,
            UserResponse owner,
            List<TransactionResponse> recentTransactions
    ) {
        this.account = account;
        this.owner = owner;
        this.recentTransactions = recentTransactions;
    }

    public AdminAccountResponse getAccount() {
        return account;
    }

    public void setAccount(AdminAccountResponse account) {
        this.account = account;
    }

    public UserResponse getOwner() {
        return owner;
    }

    public void setOwner(UserResponse owner) {
        this.owner = owner;
    }

    public List<TransactionResponse> getRecentTransactions() {
        return recentTransactions;
    }

    public void setRecentTransactions(List<TransactionResponse> recentTransactions) {
        this.recentTransactions = recentTransactions;
    }

}