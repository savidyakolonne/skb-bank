package com.skbbank.backend.account;

import com.skbbank.backend.account.dto.AccountResponse;
import com.skbbank.backend.account.dto.CreateAccountRequest;
import com.skbbank.backend.account.dto.DepositRequest;
import com.skbbank.backend.account.dto.WithdrawRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public AccountResponse createAccount(
            @RequestBody CreateAccountRequest request
            ) {
        return accountService.createAccount(
                request.getUserId(),
                request.getAccountType()
        );
    }

    @GetMapping
    public List<AccountResponse> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping("/{id}")
    public AccountResponse getAccountById(@PathVariable Long id) {
        return accountService.getAccountById(id);
    }

    @GetMapping("/user/{userId}")
    public List<AccountResponse> getAccountsByUser(@PathVariable Long userId) {
        return accountService.getAccountsByUser(userId);
    }

    @PutMapping("/{id}/deposit")
    public AccountResponse deposit(
            @PathVariable Long id,
            @RequestBody DepositRequest request
            ) {
        return accountService.deposit(id, request.getAmount());
    }

    @PutMapping("/{id}/withdraw")
    public AccountResponse withdraw(
            @PathVariable Long id,
            @RequestBody WithdrawRequest request
            ) {
        return accountService.withdraw(id, request.getAmount());
    }

}