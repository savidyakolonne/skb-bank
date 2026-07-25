package com.skbbank.backend.user.dto;

import com.skbbank.backend.account.dto.AccountResponse;
import com.skbbank.backend.transaction.dto.TransactionResponse;

import java.util.List;

public class UserDetailsResponse {

    private UserResponse user;

    private List<AccountResponse> accounts;

    private List<TransactionResponse> recentTransactions;

    public UserDetailsResponse() {
    }

    public UserDetailsResponse(
            UserResponse user,
            List<AccountResponse> accounts,
            List<TransactionResponse> recentTransactions
    ) {
        this.user = user;
        this.accounts = accounts;
        this.recentTransactions = recentTransactions;
    }

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }

    public List<AccountResponse> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<AccountResponse> accounts) {
        this.accounts = accounts;
    }

    public List<TransactionResponse> getRecentTransactions() {
        return recentTransactions;
    }

    public void setRecentTransactions(List<TransactionResponse> recentTransactions) {
        this.recentTransactions = recentTransactions;
    }
}