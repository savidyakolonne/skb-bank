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
import com.skbbank.backend.transaction.pdf.PdfService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final TransactionMapper transactionMapper;
    private final TransactionValidator transactionValidator;
    private final PdfService pdfService;

    public TransactionService(
            TransactionRepository transactionRepository,
            AccountRepository accountRepository,
            TransactionMapper transactionMapper,
            TransactionValidator transactionValidator,
            PdfService pdfService
    ) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
        this.transactionMapper = transactionMapper;
        this.transactionValidator = transactionValidator;
        this.pdfService = pdfService;
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

    // Get transactions by user
    public List<TransactionResponse> getTransactionsByUser(Long userId) {

        return transactionRepository.findByAccountUserId(userId)
                .stream()
                .map(transactionMapper::toResponse)
                .toList();

    }

    // Transfer money
    @Transactional
    public TransactionResponse transferMoney(TransferRequest request) {

        Account sender = accountRepository.findById(request.getFromAccountId())
                .orElseThrow(AccountNotFoundException::new);

        Account receiver = accountRepository
                .findByAccountNumber(
                        request.getToAccountNumber()
                )
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
                request.getRemarks(),
                request.getDestinationBank()
        );

        createTransaction(
                receiver,
                TransactionType.TRANSFER_IN,
                request.getAmount(),
                request.getRemarks(),
                request.getDestinationBank()
        );

        return transactionMapper.toResponse(senderTransaction);
    }

    private Transaction createTransaction(
            Account account,
            TransactionType type,
            java.math.BigDecimal amount,
            String remarks,
            String destinationBank
    ) {

        Transaction transaction = new Transaction();

        transaction.setAccount(account);
        transaction.setTransactionType(type);
        transaction.setAmount(amount);
        transaction.setRemarks(remarks);
        transaction.setDestinationBank(destinationBank);
        transaction.setCreatedAt(LocalDateTime.now());

        return transactionRepository.save(transaction);
    }

    // trans receipt
    public ResponseEntity<byte[]> downloadReceipt(Long transactionId){

        byte[] pdf =
                pdfService.generateTransferReceipt(transactionId)
                        .toByteArray();

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=receipt-" + transactionId + ".pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .contentLength(pdf.length)
                .body(pdf);
    }

}