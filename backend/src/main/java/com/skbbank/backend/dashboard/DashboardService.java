package com.skbbank.backend.dashboard;

import com.skbbank.backend.account.AccountRepository;
import com.skbbank.backend.account.dto.AccountResponse;
import com.skbbank.backend.account.mapper.AccountMapper;
import com.skbbank.backend.dashboard.dto.DashboardResponse;
import com.skbbank.backend.transaction.TransactionRepository;
import com.skbbank.backend.transaction.dto.TransactionResponse;
import com.skbbank.backend.transaction.mapper.TransactionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    private final AccountMapper accountMapper;
    private final TransactionMapper transactionMapper;

    public DashboardResponse getDashboard(Long userId) {

        // Get all customer accounts
        List<AccountResponse> accounts = accountRepository
                .findByUserId(userId)
                .stream()
                .map(accountMapper::toResponse)
                .toList();

        // Calculate total balance
        BigDecimal totalBalance = accounts.stream()
                .map(AccountResponse::getBalance)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Get latest transactions
        List<TransactionResponse> recentTransactions = transactionRepository
                .findByAccountUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .limit(5)
                .map(transactionMapper::toResponse)
                .toList();

        return DashboardResponse.builder()
                .totalBalance(totalBalance)
                .accounts(accounts)
                .recentTransactions(recentTransactions)
                .build();
    }
}