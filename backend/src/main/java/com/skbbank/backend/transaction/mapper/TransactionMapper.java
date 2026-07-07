package com.skbbank.backend.transaction.mapper;

import com.skbbank.backend.transaction.Transaction;
import com.skbbank.backend.transaction.dto.TransactionResponse;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {

    public TransactionResponse toResponse(Transaction transaction){

        TransactionResponse response = new TransactionResponse();

        response.setId(transaction.getId());
        response.setAccountId(transaction.getAccount().getId());
        response.setOwnerName(
                transaction.getAccount().getUser().getName()
        );
        response.setUsername(
                transaction.getAccount().getUser().getUsername()
        );
        response.setAccountNumber(transaction.getAccount().getAccountNumber());
        response.setAmount(transaction.getAmount());
        response.setTransactionType(transaction.getTransactionType());
        response.setDescription(transaction.getDescription());
        response.setCreatedAt(transaction.getCreatedAt());

        return response;
    }
}
