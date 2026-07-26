package com.skbbank.backend.transaction.mapper;

import com.skbbank.backend.transaction.Transaction;
import com.skbbank.backend.transaction.dto.TransactionResponse;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {

    public TransactionResponse toResponse(Transaction transaction){

        TransactionResponse response = new TransactionResponse();

        // trans details
        response.setId(transaction.getId());
        response.setTransactionType(transaction.getTransactionType());
        response.setAmount(transaction.getAmount());
        response.setRemarks(transaction.getRemarks());
        response.setDestinationBank(transaction.getDestinationBank());
        response.setCreatedAt(transaction.getCreatedAt());

        // account details
        response.setAccountId(transaction.getAccount().getId());
        response.setAccountNumber(transaction.getAccount().getAccountNumber());

        // user details
        response.setOwnerName(
                transaction.getAccount().getUser().getName()
        );
        response.setUsername(
                transaction.getAccount().getUser().getUsername()
        );

        return response;
    }
}
