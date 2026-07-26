package com.skbbank.backend.analytics.dto;

import java.math.BigDecimal;
import java.util.List;

public class AnalyticsResponse {

    private long totalUsers;

    private long totalAccounts;

    private long totalTransactions;

    private BigDecimal totalBankBalance;

    private long activeAccounts;

    private long frozenAccounts;

    private long closedAccounts;

    private List<MonthlyTransactionResponse> monthlyTransactions;

    public AnalyticsResponse() {
    }

    public AnalyticsResponse(
            long totalUsers,
            long totalAccounts,
            long totalTransactions,
            BigDecimal totalBankBalance,
            long activeAccounts,
            long frozenAccounts,
            long closedAccounts,
            List<MonthlyTransactionResponse> monthlyTransactions
    ) {
        this.totalUsers = totalUsers;
        this.totalAccounts = totalAccounts;
        this.totalTransactions = totalTransactions;
        this.totalBankBalance = totalBankBalance;
        this.activeAccounts = activeAccounts;
        this.frozenAccounts = frozenAccounts;
        this.closedAccounts = closedAccounts;
        this.monthlyTransactions = monthlyTransactions;
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

    public long getActiveAccounts() {
        return activeAccounts;
    }

    public void setActiveAccounts(long activeAccounts) {
        this.activeAccounts = activeAccounts;
    }

    public long getFrozenAccounts() {
        return frozenAccounts;
    }

    public void setFrozenAccounts(long frozenAccounts) {
        this.frozenAccounts = frozenAccounts;
    }

    public long getClosedAccounts() {
        return closedAccounts;
    }

    public void setClosedAccounts(long closedAccounts) {
        this.closedAccounts = closedAccounts;
    }

    public List<MonthlyTransactionResponse> getMonthlyTransactions(){
        return monthlyTransactions;
    }

    public void setMonthlyTransactions(List<MonthlyTransactionResponse> monthlyTransactions){
        this.monthlyTransactions = monthlyTransactions;
    }

}