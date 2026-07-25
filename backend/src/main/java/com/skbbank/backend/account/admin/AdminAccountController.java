package com.skbbank.backend.account.admin;

import com.skbbank.backend.account.admin.dto.AccountDetailsResponse;
import com.skbbank.backend.account.admin.dto.AdminAccountResponse;
import com.skbbank.backend.account.dto.AccountResponse;
import com.skbbank.backend.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(
        name = "Admin Accounts",
        description = "Admin Account Management APIs"
)
@SecurityRequirement(name = "Bearer Authentication")
@RestController
@RequestMapping("/api/admin/accounts")
@PreAuthorize("hasRole('ADMIN')")
public class AdminAccountController {

    private final AdminAccountService adminAccountService;

    public AdminAccountController(AdminAccountService adminAccountService){
        this.adminAccountService = adminAccountService;
    }

    // get all accounts
    @Operation(summary = "Get all accounts")
    @GetMapping
    public ApiResponse<List<AdminAccountResponse>> getAllAccounts() {

        return new ApiResponse<>(
                true,
                "Accounts retrieved successfully",
                adminAccountService.getAllAccounts()
        );
    }

    // get account details
    @Operation(summary = "Get account details")
    @GetMapping("/{id}")
    public ApiResponse<AccountDetailsResponse> getAccountDetails(
            @PathVariable Long id
    ){
        return new ApiResponse<>(
                true,
                "Account details retrieved successfully",
                adminAccountService.getAccountDetails(id)
        );
    }
}
