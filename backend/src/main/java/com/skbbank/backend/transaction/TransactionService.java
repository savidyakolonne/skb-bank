package com.skbbank.backend.transaction;

import com.skbbank.backend.account.Account;
import com.skbbank.backend.account.AccountRepository;
import com.skbbank.backend.common.exception.AccountNotFoundException;
import com.skbbank.backend.common.exception.InsufficientBalanceException;
import com.skbbank.backend.common.exception.TransactionNotFoundException;
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

    public TransactionService(
            TransactionRepository transactionRepository,
            AccountRepository accountRepository,
            TransactionMapper transactionMapper
    ) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
        this.transactionMapper = transactionMapper;
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

        Account sender = accountRepository.findById(request.getSenderAccountId())
                .orElseThrow(AccountNotFoundException::new);

        Account receiver = accountRepository.findById(request.getReceiverAccountId())
                .orElseThrow(AccountNotFoundException::new);

        if (sender.getBalance().compareTo(request.getAmount()) < 0) {
            throw new InsufficientBalanceException();
        }

        sender.setBalance(sender.getBalance().subtract(request.getAmount()));
        receiver.setBalance(receiver.getBalance().add(request.getAmount()));

        accountRepository.save(sender);
        accountRepository.save(receiver);

        Transaction senderTransaction = new Transaction();

        senderTransaction.setAccount(sender);
        senderTransaction.setAmount(request.getAmount());
        senderTransaction.setTransactionType(TransactionType.TRANSFER_OUT);
        senderTransaction.setDescription(request.getDescription());
        senderTransaction.setCreatedAt(LocalDateTime.now());

        transactionRepository.save(senderTransaction);

        Transaction receiverTransaction = new Transaction();

        receiverTransaction.setAccount(receiver);
        receiverTransaction.setAmount(request.getAmount());
        receiverTransaction.setTransactionType(TransactionType.TRANSFER_IN);
        receiverTransaction.setDescription(request.getDescription());
        receiverTransaction.setCreatedAt(LocalDateTime.now());

        transactionRepository.save(receiverTransaction);

        return transactionMapper.toResponse(senderTransaction);
    }

}