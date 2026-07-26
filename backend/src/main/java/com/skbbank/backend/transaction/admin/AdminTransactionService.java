package com.skbbank.backend.transaction.admin;

import com.skbbank.backend.account.Account;
import com.skbbank.backend.account.AccountRepository;
import com.skbbank.backend.account.admin.dto.AdminAccountResponse;
import com.skbbank.backend.common.exception.TransactionNotFoundException;
import com.skbbank.backend.transaction.Transaction;
import com.skbbank.backend.transaction.TransactionRepository;
import com.skbbank.backend.transaction.admin.dto.AdminTransactionResponse;
import com.skbbank.backend.transaction.admin.dto.TransactionDetailsResponse;
import com.skbbank.backend.user.User;
import com.skbbank.backend.user.dto.UserResponse;
import com.skbbank.backend.user.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminTransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final UserMapper userMapper;

    public AdminTransactionService(
            TransactionRepository transactionRepository,
            AccountRepository accountRepository,
            UserMapper userMapper
    ) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
        this.userMapper = userMapper;
    }

    // Get all transactions
    public List<AdminTransactionResponse> getAllTransactions() {

        return transactionRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    // Get transaction details
    public TransactionDetailsResponse getTransactionDetails(Long id) {

        Transaction transaction = findTransaction(id);

        Account account = transaction.getAccount();

        User customer = account.getUser();

        AdminAccountResponse accountResponse =
                new AdminAccountResponse(
                        account.getId(),
                        account.getAccountNumber(),
                        customer.getName(),
                        account.getAccountType(),
                        account.getBalance(),
                        account.getStatus()
                );

        UserResponse customerResponse =
                userMapper.toResponse(customer);

        return new TransactionDetailsResponse(
                mapToResponse(transaction),
                accountResponse,
                customerResponse
        );

    }

    // Find transaction
    private Transaction findTransaction(Long id) {

        return transactionRepository.findById(id)
                .orElseThrow(TransactionNotFoundException::new);

    }

    // Map Transaction -> AdminTransactionResponse
    private AdminTransactionResponse mapToResponse(
            Transaction transaction
    ) {

        return new AdminTransactionResponse(
                transaction.getId(),
                transaction.getTransactionType(),
                transaction.getAmount(),
                transaction.getAccount().getAccountNumber(),
                transaction.getAccount().getUser().getName(),
                transaction.getCreatedAt()
        );

    }

}