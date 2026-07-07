package com.skbbank.backend.account.mapper;

import com.skbbank.backend.account.Account;
import com.skbbank.backend.account.dto.AccountResponse;
import org.springframework.stereotype.Component;

@Component
public class AccountMapper {

    public AccountResponse toResponse(Account account){

        AccountResponse response = new AccountResponse();

        response.setId(account.getId());
        response.setAccountNumber(account.getAccountNumber());
        response.setAccountType(account.getAccountType());
        response.setBalance(account.getBalance());
        response.setStatus(account.getStatus());
        response.setOwnername(
                account.getUser().getName()
        );
        response.setUsername(
                account.getUser().getUsername()
        );

        return response;

    }
}
