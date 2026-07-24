package com.skbbank.backend.admin.dto;

import com.skbbank.backend.transaction.dto.TransactionResponse;
import com.skbbank.backend.user.dto.UserResponse;

import java.math.BigDecimal;
import java.util.List;

public class AdminDashboardResponse {

    private long totalUsers;
    private long totalAccounts;
    private long totalTransactions;
    private BigDecimal totalBankBalance;

    private List<UserResponse> recentUsers;
    private List<TransactionResponse> recentTransactions;

    public AdminDashboardResponse() {
    }

    public AdminDashboardResponse(
            long totalUsers,
            long totalAccounts,
            long totalTransactions,
            BigDecimal totalBankBalance,
            List<UserResponse> recentUsers,
            List<TransactionResponse> recentTransactions
    ) {
        this.totalUsers = totalUsers;
        this.totalAccounts = totalAccounts;
        this.totalTransactions = totalTransactions;
        this.totalBankBalance = totalBankBalance;
        this.recentUsers = recentUsers;
        this.recentTransactions = recentTransactions;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalAccounts() {
        return totalAccounts;
    }

    public void setTotalAccounts(long totalAccounts) {
        this.totalAccounts = totalAccounts;
    }

    public long getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(long totalTransactions) {
        this.totalTransactions = totalTransactions;
    }

    public BigDecimal getTotalBankBalance() {
        return totalBankBalance;
    }

    public void setTotalBankBalance(BigDecimal totalBankBalance) {
        this.totalBankBalance = totalBankBalance;
    }

    public List<UserResponse> getRecentUsers() {
        return recentUsers;
    }

    public void setRecentUsers(List<UserResponse> recentUsers) {
        this.recentUsers = recentUsers;
    }

    public List<TransactionResponse> getRecentTransactions() {
        return recentTransactions;
    }

    public void setRecentTransactions(List<TransactionResponse> recentTransactions) {
        this.recentTransactions = recentTransactions;
    }

}