package com.skbbank.backend.account;

import com.skbbank.backend.account.dto.AccountResponse;
import com.skbbank.backend.account.dto.CreateAccountRequest;
import com.skbbank.backend.account.dto.DepositRequest;
import com.skbbank.backend.account.dto.WithdrawRequest;
import com.skbbank.backend.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name = "Accounts",
        description = "Bank Account APIs"
)
@SecurityRequirement(name = "Bearer Authentication")
@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @Operation(summary = "Create account")
    @PreAuthorize("hasRole('USER')")
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

    @Operation(summary = "Get all accounts")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping
    public  ApiResponse<List<AccountResponse>> getAllAccounts() {

        List<AccountResponse> accounts = accountService.getAllAccounts();

        return new ApiResponse<>(
                true,
                "Accounts retrieved successfully",
                accounts
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/{id}")
    public AccountResponse getAccountById(@PathVariable Long id) {
        AccountResponse account = accountService.getAccountById(id);

        return new ApiResponse<>(
                true,
                "Account retrieved successfully",
                account
        ).getData();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
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

    @Operation(summary = "Deposit money")
    @PreAuthorize("hasRole('USER')")
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

    @Operation(summary = "Withdraw money")
    @PreAuthorize("hasRole('USER')")
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