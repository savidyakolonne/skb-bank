package com.skbbank.backend.account;

import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public Account createAccount(
            @RequestParam Long userId,
            @RequestParam String accountType
    ) {
        return accountService.createAccount(userId, accountType);
    }

    @GetMapping
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping("/{id}")
    public Account getAccountById(@PathVariable Long id) {
        return accountService.getAccountsById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Account> getAccountsByUser(@PathVariable Long userId) {
        return accountService.getAccountsByUser(userId);
    }

    @PutMapping("/{id}/deposit")
    public Account deposit(
            @PathVariable Long id,
            @RequestParam BigDecimal amount
    ) {
        return accountService.deposit(id, amount);
    }

    @PutMapping("/{id}/withdraw")
    public Account withdraw(
            @PathVariable Long id,
            @RequestParam BigDecimal amount
    ) {
        return accountService.withdraw(id, amount);
    }

}