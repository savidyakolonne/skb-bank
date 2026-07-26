package com.skbbank.backend.transaction.admin.dto;

import com.skbbank.backend.account.admin.dto.AdminAccountResponse;
import com.skbbank.backend.user.dto.UserResponse;

public class TransactionDetailsResponse {

    private AdminTransactionResponse transaction;

    private AdminAccountResponse account;

    private UserResponse customer;

    private TransactionDetailsResponse(){

    }

    public TransactionDetailsResponse(
            AdminTransactionResponse transaction,
            AdminAccountResponse account,
            UserResponse customer
    ) {
        this.transaction = transaction;
        this.account = account;
        this.customer = customer;
    }

    public AdminTransactionResponse getTransaction() {
        return transaction;
    }

    public void setTransaction(AdminTransactionResponse transaction) {
        this.transaction = transaction;
    }

    public AdminAccountResponse getAccount() {
        return account;
    }

    public void setAccount(AdminAccountResponse account) {
        this.account = account;
    }

    public UserResponse getCustomer() {
        return customer;
    }

    public void setCustomer(UserResponse customer) {
        this.customer = customer;
    }
}
