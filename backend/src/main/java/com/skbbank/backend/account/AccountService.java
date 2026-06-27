package com.skbbank.backend.account;

import com.skbbank.backend.user.User;
import com.skbbank.backend.user.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public AccountService(
            AccountRepository accountRepository,
            UserRepository userRepository
    ){
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }

    // create a new account
    public Account createAccount(Long userId, String accountType){

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Account account = new Account();

        account.setAccountNumber(generateAccountNumber());
        account.setAccountType(accountType);
        account.setBalance(BigDecimal.ZERO);
        account.setStatus("ACTIVE");
        account.setCreatedAt(LocalDateTime.now());
        account.setUser(user);

        return accountRepository.save(account);
    }

    // get all accounts of a user
    public List<Account> getAccountsByUser(Long userId){
        return accountRepository.findByUserId(userId);
    }

    // deposit money
    public Account deposit(Long accountId, BigDecimal amount){

        Account account = getAccountsById(accountId);

        account.setBalance(account.getBalance().add(amount));

        return accountRepository.save(account);
    }

    // withdraw money
    public Account withdraw(Long accountId, BigDecimal amount){

        Account account = getAccountsById(accountId);

        if(account.getBalance().compareTo(amount) < 0){
            throw new RuntimeException("Insufficient balance");
        }

        account.setBalance(account.getBalance().subtract(amount));

        return accountRepository.save(account);
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
    public Account getAccountsById(Long id){

        return accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    // get all accounts
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

}
