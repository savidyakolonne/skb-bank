package com.skbbank.backend.transaction;

import com.skbbank.backend.account.Account;
import com.skbbank.backend.account.AccountRepository;
import com.skbbank.backend.common.exception.AccountNotFoundException;
import com.skbbank.backend.common.exception.TransactionNotFoundException;
import com.skbbank.backend.common.validation.TransactionValidator;
import com.skbbank.backend.transaction.dto.TransactionResponse;
import com.skbbank.backend.transaction.dto.TransferRequest;
import com.skbbank.backend.transaction.mapper.TransactionMapper;
import com.skbbank.backend.transaction.enums.TransactionType;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final TransactionMapper transactionMapper;
    private final TransactionValidator transactionValidator;

    public TransactionService(
            TransactionRepository transactionRepository,
            AccountRepository accountRepository,
            TransactionMapper transactionMapper,
            TransactionValidator transactionValidator
    ) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
        this.transactionMapper = transactionMapper;
        this.transactionValidator = transactionValidator;
    }

    // Get all transactions
    public List<TransactionResponse> getAllTransactions() {

        return transactionRepository.findAll()
                .stream()
                .map(transactionMapper::toResponse)
                .toList();
    }

    // Get transaction by ID
    public TransactionResponse getTransactionById(Long id) {

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(TransactionNotFoundException::new);

        return transactionMapper.toResponse(transaction);
    }

    // Get transactions by account
    public List<TransactionResponse> getTransactionsByAccount(Long accountId) {

        return transactionRepository.findByAccountId(accountId)
                .stream()
                .map(transactionMapper::toResponse)
                .toList();
    }

    // Transfer money
    @Transactional
    public TransactionResponse transferMoney(TransferRequest request) {

        Account sender = accountRepository.findById(request.getFromAccountId())
                .orElseThrow(AccountNotFoundException::new);

        Account receiver = accountRepository.findById(request.getToAccountId())
                .orElseThrow(AccountNotFoundException::new);

        transactionValidator.validateTransfer(
                sender,
                receiver,
                request.getAmount()
        );

        sender.setBalance(sender.getBalance().subtract(request.getAmount()));
        receiver.setBalance(receiver.getBalance().add(request.getAmount()));

        accountRepository.save(sender);
        accountRepository.save(receiver);

        transactionRepository.flush();

        Transaction senderTransaction = createTransaction(
                sender,
                TransactionType.TRANSFER_OUT,
                request.getAmount(),
                request.getDescription()
        );

        createTransaction(
                receiver,
                TransactionType.TRANSFER_IN,
                request.getAmount(),
                request.getDescription()
        );

        return transactionMapper.toResponse(senderTransaction);
    }

    private Transaction createTransaction(
            Account account,
            TransactionType type,
            java.math.BigDecimal amount,
            String description
    ) {

        Transaction transaction = new Transaction();

        transaction.setAccount(account);
        transaction.setTransactionType(type);
        transaction.setAmount(amount);
        transaction.setDescription(description);
        transaction.setCreatedAt(LocalDateTime.now());

        return transactionRepository.save(transaction);
    }

}