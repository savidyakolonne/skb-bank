package com.skbbank.backend.transaction;

import com.skbbank.backend.common.response.ApiResponse;
import com.skbbank.backend.transaction.dto.TransactionResponse;
import com.skbbank.backend.transaction.dto.TransferRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name = "Transactions",
        description = "Transaction APIs"
)
@SecurityRequirement(name = "Bearer Authentication")
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService){
        this.transactionService = transactionService;
    }

    // get all transactions
    @Operation(summary = "Get all transactions")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ApiResponse<List<TransactionResponse>> getAllTransactions(){

        List<TransactionResponse> transactions =
                transactionService.getAllTransactions();

        return new ApiResponse<>(
                true,
                "Transactions retrieved successfully",
                transactions
        );
    }

    // get all transactions by ID
    @Operation(summary = "Get transaction by id")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ApiResponse<TransactionResponse> getTransactionById(
            @PathVariable Long id
    ){
        TransactionResponse transaction =
                transactionService.getTransactionById(id);

        return new ApiResponse<>(
                true,
                "Transaction retrieved successfully",
                transaction
        );
    }

    // get transaction by account
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/account/{accountId}")
    public ApiResponse<List<TransactionResponse>> getAllTransactionsByAccount(
            @PathVariable Long accountId
    ){

        List<TransactionResponse> transactions =
                transactionService.getTransactionsByAccount(accountId);

        return new ApiResponse<>(
                true,
                "Account transaction retrieved successfully",
                transactions
        );
    }

    // transfer money
    @Operation(summary = "Transfer money")
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/transfer")
    public ApiResponse<TransactionResponse> transferMoney(
            @Valid @RequestBody TransferRequest request
    ){

        TransactionResponse transaction =
                transactionService.transferMoney(request);

        return new ApiResponse<>(
                true,
                "Transfer completed successfully",
                transaction
        );
    }
}
