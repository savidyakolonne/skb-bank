package com.skbbank.backend.admin;

import com.skbbank.backend.account.AccountRepository;
import com.skbbank.backend.admin.dto.AdminDashboardResponse;
import com.skbbank.backend.transaction.TransactionRepository;
import com.skbbank.backend.transaction.dto.TransactionResponse;
import com.skbbank.backend.transaction.mapper.TransactionMapper;
import com.skbbank.backend.user.UserRepository;
import com.skbbank.backend.user.dto.UserResponse;
import com.skbbank.backend.user.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    private final UserMapper userMapper;
    private final TransactionMapper transactionMapper;

    public AdminService(
            UserRepository userRepository,
            AccountRepository accountRepository,
            TransactionRepository transactionRepository,
            UserMapper userMapper,
            TransactionMapper transactionMapper
    ) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
        this.userMapper = userMapper;
        this.transactionMapper = transactionMapper;
    }

    public AdminDashboardResponse getDashboard() {

        long totalUsers = userRepository.count();

        long totalAccounts = accountRepository.count();

        long totalTransactions = transactionRepository.count();

        BigDecimal totalBankBalance =
                accountRepository.getTotalBankBalance();

        List<UserResponse> recentUsers =
                userRepository.findTop5ByOrderByIdDesc()
                        .stream()
                        .map(userMapper::toResponse)
                        .toList();

        List<TransactionResponse> recentTransactions =
                transactionRepository.findTop5ByOrderByCreatedAtDesc()
                        .stream()
                        .map(transactionMapper::toResponse)
                        .toList();

        return new AdminDashboardResponse(
                totalUsers,
                totalAccounts,
                totalTransactions,
                totalBankBalance,
                recentUsers,
                recentTransactions
        );

    }

}