package com.skbbank.backend.common.validation;

import com.skbbank.backend.account.Account;
import com.skbbank.backend.account.enums.AccountStatus;
import com.skbbank.backend.common.exception.InsufficientBalanceException;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class TransactionValidator {

    public void validateTransfer(
            Account sender,
            Account receiver,
            BigDecimal amount
    ){

        if(sender.getId().equals(receiver.getId())){
            throw new IllegalArgumentException(
                    "Cannot transfer to the same account"
            );
        }

        if(amount == null || amount.compareTo(BigDecimal.ZERO) <= 0){
            throw new IllegalArgumentException(
                    "Amount must be greater than zero"
            );
        }

        if(sender.getStatus() != AccountStatus.ACTIVE){
            throw new IllegalArgumentException(
                    "Sender account is inactive"
            );
        }

        if(receiver.getStatus() != AccountStatus.ACTIVE){
            throw new IllegalArgumentException(
                    "Receiver account is inactive"
            );
        }

        if(sender.getBalance().compareTo(amount) < 0){
            throw new InsufficientBalanceException();
        }
    }
}
