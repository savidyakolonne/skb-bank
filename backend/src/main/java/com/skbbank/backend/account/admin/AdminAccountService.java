package com.skbbank.backend.account.admin;

import com.skbbank.backend.account.Account;
import com.skbbank.backend.account.AccountRepository;
import com.skbbank.backend.account.admin.dto.AccountDetailsResponse;
import com.skbbank.backend.account.admin.dto.AdminAccountResponse;
import com.skbbank.backend.account.enums.AccountStatus;
import com.skbbank.backend.common.exception.AccountNotFoundException;
import com.skbbank.backend.transaction.TransactionRepository;
import com.skbbank.backend.transaction.dto.TransactionResponse;
import com.skbbank.backend.transaction.mapper.TransactionMapper;
import com.skbbank.backend.user.dto.UserResponse;
import com.skbbank.backend.user.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminAccountService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final UserMapper userMapper;
    private final TransactionMapper transactionMapper;

    public AdminAccountService(
            AccountRepository accountRepository,
            TransactionRepository transactionRepository,
            UserMapper userMapper,
            TransactionMapper transactionMapper
    ){
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
        this.userMapper = userMapper;
        this.transactionMapper = transactionMapper;
    }

    // get all accounts
    public List<AdminAccountResponse> getAllAccounts(){

        return accountRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // get account details
    public AccountDetailsResponse getAccountDetails(Long id){

        Account account = findAccount(id);

        UserResponse owner =
                userMapper.toResponse(account.getUser());

        List<TransactionResponse> transactions =
                transactionRepository
                        .findByAccountIdOrderByCreatedAtDesc(id)
                        .stream()
                        .map(transactionMapper::toResponse)
                        .toList();

        return new AccountDetailsResponse(
                mapToResponse(account),
                owner,
                transactions
        );
    }

    // Freeze account
    public void freezeAccount(Long id) {

        Account account = findAccount(id);

        account.setStatus(AccountStatus.FROZEN);

        accountRepository.save(account);
    }

    // Activate account
    public void activateAccount(Long id) {

        Account account = findAccount(id);

        account.setStatus(AccountStatus.ACTIVE);

        accountRepository.save(account);
    }

    // Close account
    public void closeAccount(Long id) {

        Account account = findAccount(id);

        account.setStatus(AccountStatus.CLOSED);

        accountRepository.save(account);
    }

    // Find account
    private Account findAccount(Long id) {

        return accountRepository.findById(id)
                .orElseThrow(AccountNotFoundException::new);
    }

    // Map Account -> AdminAccountResponse
    private AdminAccountResponse mapToResponse(Account account) {

        return new AdminAccountResponse(
                account.getId(),
                account.getAccountNumber(),
                account.getUser().getName(),
                account.getAccountType(),
                account.getBalance(),
                account.getStatus()
        );
    }

}
