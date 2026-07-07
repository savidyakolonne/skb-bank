package com.skbbank.backend.account;

import com.skbbank.backend.account.enums.AccountStatus;
import com.skbbank.backend.account.enums.AccountType;
import com.skbbank.backend.common.exception.AccountNotFoundException;
import com.skbbank.backend.common.exception.InsufficientBalanceException;
import com.skbbank.backend.common.exception.UserNotFoundException;
import com.skbbank.backend.common.validation.AccountValidator;
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
    private final AccountValidator accountValidator;

    public AccountService(
            AccountRepository accountRepository,
            UserRepository userRepository,
            AccountMapper accountMapper,
            AccountValidator accountValidator
    ){
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
        this.accountMapper = accountMapper;
        this.accountValidator = accountValidator;
    }

    // create a new account
    public AccountResponse createAccount(Long userId, AccountType accountType){

        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        Account account = new Account();

        account.setAccountNumber(generateAccountNumber());
        account.setAccountType(accountType);
        account.setBalance(BigDecimal.ZERO);
        account.setStatus(AccountStatus.ACTIVE);
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

        accountValidator.validateDeposit(amount);

        account.setBalance(
                account.getBalance().add(amount)
        );

        Account updatedAccount = accountRepository.save(account);

        return accountMapper.toResponse(updatedAccount);
    }

    // withdraw money
    public AccountResponse withdraw(Long accountId, BigDecimal amount){

        Account account = findAccount(accountId);

        if(account.getBalance().compareTo(amount) < 0){
            throw new InsufficientBalanceException();
        }

        accountValidator.validateWithdraw(account, amount);

        account.setBalance(
                account.getBalance().subtract(amount)
        );

        Account updatedAccount = accountRepository.save(account);

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
                .orElseThrow(AccountNotFoundException::new);

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
                .orElseThrow(AccountNotFoundException::new);
    }

}
