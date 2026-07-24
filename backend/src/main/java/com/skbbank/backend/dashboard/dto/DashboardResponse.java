package com.skbbank.backend.dashboard.dto;

import com.skbbank.backend.account.dto.AccountResponse;
import com.skbbank.backend.transaction.dto.TransactionResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private BigDecimal totalBalance;

    private List<AccountResponse> accounts;

    private List<TransactionResponse> recentTransactions;

}