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

        return new ApiResponse<>(
                true,
                "Account created successfully",
                accountService.createAccount(
                        request.getUserId(),
                        request.getAccountType()
                )
        );
    }

    @Operation(summary = "Get all accounts")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ApiResponse<List<AccountResponse>> getAllAccounts() {

        return new ApiResponse<>(
                true,
                "Accounts retrieved successfully",
                accountService.getAllAccounts()
        );
    }

    @Operation(summary = "Get account by id")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ApiResponse<AccountResponse> getAccountById(
            @PathVariable Long id
    ) {

        return new ApiResponse<>(
                true,
                "Account retrieved successfully",
                accountService.getAccountById(id)
        );
    }

    @Operation(summary = "Get accounts by user")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/user/{userId}")
    public ApiResponse<List<AccountResponse>> getAccountsByUser(
            @PathVariable Long userId
    ) {

        return new ApiResponse<>(
                true,
                "User accounts retrieved successfully",
                accountService.getAccountsByUser(userId)
        );
    }

    @Operation(summary = "Deposit money")
    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{id}/deposit")
    public ApiResponse<AccountResponse> deposit(
            @PathVariable Long id,
            @Valid @RequestBody DepositRequest request
    ) {

        return new ApiResponse<>(
                true,
                "Deposit successful",
                accountService.deposit(id, request.getAmount())
        );
    }

    @Operation(summary = "Withdraw money")
    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{id}/withdraw")
    public ApiResponse<AccountResponse> withdraw(
            @PathVariable Long id,
            @Valid @RequestBody WithdrawRequest request
    ) {

        return new ApiResponse<>(
                true,
                "Withdrawal successful",
                accountService.withdraw(id, request.getAmount())
        );
    }

}