package com.skbbank.backend.account;

import com.skbbank.backend.account.dto.AccountResponse;
import com.skbbank.backend.account.dto.CreateAccountRequest;
import com.skbbank.backend.account.dto.DepositRequest;
import com.skbbank.backend.account.dto.WithdrawRequest;
import com.skbbank.backend.common.response.ApiResponse;
import jakarta.validation.Valid;
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
    public ApiResponse<AccountResponse> createAccount(
            @Valid @RequestBody CreateAccountRequest request
            ) {
        AccountResponse account = accountService.createAccount(
                request.getUserId(),
                request.getAccountType()
        );

        return new ApiResponse<>(
                true,
                "Account created successfully",
                account
        );
    }

    @GetMapping
    public  ApiResponse<List<AccountResponse>> getAllAccounts() {

        List<AccountResponse> accounts = accountService.getAllAccounts();

        return new ApiResponse<>(
                true,
                "Accounts retrieved successfully",
                accounts
        );
    }

    @GetMapping("/{id}")
    public AccountResponse getAccountById(@PathVariable Long id) {
        AccountResponse account = accountService.getAccountById(id);

        return new ApiResponse<>(
                true,
                "Account retrieved successfully",
                account
        ).getData();
    }

    @GetMapping("/user/{userId}")
    public List<AccountResponse> getAccountsByUser(
            @PathVariable Long userId
    ) {
        List<AccountResponse> accounts =
                accountService.getAccountsByUser(userId);

        return new ApiResponse<>(
                true,
                "User accounts retrieved successfully",
                accounts
        ).getData();
    }

    @PutMapping("/{id}/deposit")
    public AccountResponse deposit(
            @PathVariable Long id,
            @Valid @RequestBody DepositRequest request
            ) {

        AccountResponse account =
                accountService.deposit(id, request.getAmount());

        return new ApiResponse<>(
                true,
                "Deposit successfully",
                account
        ).getData();
    }

    @PutMapping("/{id}/withdraw")
    public AccountResponse withdraw(
            @PathVariable Long id,
            @Valid @RequestBody WithdrawRequest request
            ) {
        AccountResponse account =
                accountService.withdraw(id, request.getAmount());

        return new ApiResponse<>(
                true,
                "Withdrawal successful",
                account
        ).getData();
    }

}