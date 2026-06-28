package com.skbbank.backend.account;

import com.skbbank.backend.user.User;
import com.skbbank.backend.user.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import com.skbbank.backend.account.dto.AccountResponse;
import com.skbbank.backend.account.mapper.AccountMapper;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final AccountMapper accountMapper;

    public AccountService(
            AccountRepository accountRepository,
            UserRepository userRepository,
            AccountMapper accountMapper
    ){
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
        this.accountMapper = accountMapper;
    }

    // create a new account
    public AccountResponse createAccount(Long userId, String accountType){

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Account account = new Account();

        account.setAccountNumber(generateAccountNumber());
        account.setAccountType(accountType);
        account.setBalance(BigDecimal.ZERO);
        account.setStatus("ACTIVE");
        account.setCreatedAt(LocalDateTime.now());
        account.setUser(user);

        Account savedAccount =  accountRepository.save(account);

        return accountMapper.toResponse(savedAccount);
    }

    // get all accounts of a user
    public List<AccountResponse> getAccountsByUser(Long userId){

        return accountRepository.findByUserId(userId)
                .stream()
                .map(accountMapper::toResponse)
                .toList();
    }

    // deposit money
    public AccountResponse deposit(Long accountId, BigDecimal amount){

        Account account = findAccount(accountId);

        account.setBalance(account.getBalance().add(amount));

        Account updatedAccount = accountRepository.save(account);

        return accountMapper.toResponse(updatedAccount);
    }

    // withdraw money
    public AccountResponse withdraw(Long accountId, BigDecimal amount){

        Account account = findAccount(accountId);

        if(account.getBalance().compareTo(amount) < 0){
            throw new RuntimeException("Insufficient balance");
        }

        account.setBalance(account.getBalance().subtract(amount));

        Account updatedAccount =  accountRepository.save(account);

        return accountMapper.toResponse(updatedAccount);
    }

    // generate unique account number
    private String generateAccountNumber(){

        Random random = new Random();

        String accountNumber;

        do{
            accountNumber = "SKB" + (100000000 + random.nextInt(900000000));
        }while(accountRepository.existsByAccountNumber(accountNumber));

        return accountNumber;
    }

    // get account by id
    public AccountResponse getAccountById(Long id){

        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        return accountMapper.toResponse(account);
    }

    // get all accounts
    public List<AccountResponse> getAllAccounts() {
        return accountRepository.findAll()
                .stream()
                .map(accountMapper::toResponse)
                .toList();
    }

    // find account
    private Account findAccount(Long id){

        return accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

}
