package com.skbbank.backend.transaction.admin;

import com.skbbank.backend.common.response.ApiResponse;
import com.skbbank.backend.transaction.admin.dto.AdminTransactionResponse;
import com.skbbank.backend.transaction.admin.dto.TransactionDetailsResponse;
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
        name = "Admin Transactions",
        description = "Admin Transaction Management APIs"
)
@SecurityRequirement(name = "Bearer Authentication")
@RestController
@RequestMapping("/api/admin/transactions")
@PreAuthorize("hasRole('ADMIN')")
public class AdminTransactionController {

    private final AdminTransactionService adminTransactionService;

    public AdminTransactionController(
            AdminTransactionService adminTransactionService
    ){
        this.adminTransactionService = adminTransactionService;
    }

    // get all transactions
    @Operation(summary = "Get all transactions")
    @GetMapping
    public ApiResponse<List<AdminTransactionResponse>> getAllTransactions(){

        return new ApiResponse<>(
                true,
                "Transactions retrieved successfully",
                adminTransactionService.getAllTransactions()
        );
    }

    // get transaction details
    @Operation(summary = "Get transaction details")
    @GetMapping("/{id}")
    public ApiResponse<TransactionDetailsResponse> getTransactionDetails(
            @PathVariable Long id
    ){

        return new ApiResponse<>(
                true,
                "Transaction retrieved successfully",
                adminTransactionService.getTransactionDetails(id)
        );
    }
}
