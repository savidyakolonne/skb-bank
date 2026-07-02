package com.skbbank.backend.common.validation;

import com.skbbank.backend.account.Account;
import com.skbbank.backend.account.enums.AccountStatus;
import com.skbbank.backend.common.exception.InsufficientBalanceException;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class AccountValidator {

    public void validateDeposit(BigDecimal amount){

        if(amount == null || amount.compareTo(BigDecimal.ZERO) <= 0){
            throw new IllegalArgumentException(
                    "Deposit amount must be greater tha zero"
            );
        }
    }

    public void validateWithdraw(Account account, BigDecimal amount){

        if(amount == null || amount.compareTo(BigDecimal.ZERO) <= 0){
            throw new IllegalArgumentException(
                    "Withdraw amount must be greater tha zero"
            );
        }

        if(account.getStatus() != AccountStatus.ACTIVE){
            throw new IllegalArgumentException(
                    "Account is not active"
            );
        }

        if(account.getBalance().compareTo(amount) < 0){
            throw new InsufficientBalanceException();
        }
    }

    public void validateActiveAccount(Account account){

        if(account.getStatus() != AccountStatus.ACTIVE){
            throw new IllegalArgumentException(
                    "Account is not active"
            );
        }
    }
}
