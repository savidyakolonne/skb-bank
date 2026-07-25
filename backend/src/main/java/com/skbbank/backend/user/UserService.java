package com.skbbank.backend.user;

import com.skbbank.backend.account.AccountRepository;
import com.skbbank.backend.account.dto.AccountResponse;
import com.skbbank.backend.account.mapper.AccountMapper;
import com.skbbank.backend.common.exception.EmailAlreadyExistsException;
import com.skbbank.backend.common.exception.UserNotFoundException;
import com.skbbank.backend.transaction.TransactionRepository;
import com.skbbank.backend.transaction.dto.TransactionResponse;
import com.skbbank.backend.transaction.mapper.TransactionMapper;
import com.skbbank.backend.user.dto.CreateUserRequest;
import com.skbbank.backend.user.dto.UpdateUserRequest;
import com.skbbank.backend.user.dto.UserDetailsResponse;
import com.skbbank.backend.user.dto.UserResponse;
import com.skbbank.backend.user.enums.Role;
import com.skbbank.backend.user.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    private final AccountMapper accountMapper;
    private final TransactionMapper transactionMapper;

    public UserService(
            UserRepository userRepository,
            UserMapper userMapper,
            PasswordEncoder passwordEncoder,
            AccountRepository accountRepository,
            TransactionRepository transactionRepository,
            AccountMapper accountMapper,
            TransactionMapper transactionMapper
    ) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
        this.accountMapper = accountMapper;
        this.transactionMapper = transactionMapper;
    }

    // Get all users
    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(userMapper::toResponse)
                .toList();
    }

    // Get user by ID
    public UserResponse getUserById(Long id) {

        User user = findUser(id);

        return userMapper.toResponse(user);
    }

    // Create user
    public UserResponse createUser(CreateUserRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException();
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);

        return userMapper.toResponse(savedUser);
    }

    // Update user
    public UserResponse updateUser(Long id, UpdateUserRequest request) {

        User user = findUser(id);

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        User updatedUser = userRepository.save(user);

        return userMapper.toResponse(updatedUser);
    }

    // Delete user
    public void deleteUser(Long id) {

        User user = findUser(id);

        userRepository.delete(user);
    }

    // Find user
    private User findUser(Long id) {

        return userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
    }

    // get user details
    public UserDetailsResponse getUserDetails(Long id) {

        User user = findUser(id);

        List<AccountResponse> accounts =
                accountRepository.findByUserId(id)
                        .stream()
                        .map(accountMapper::toResponse)
                        .toList();

        List<TransactionResponse> recentTransactions =
                transactionRepository
                        .findByAccountUserIdOrderByCreatedAtDesc(id)
                        .stream()
                        .limit(10)
                        .map(transactionMapper::toResponse)
                        .toList();

        return new UserDetailsResponse(
                userMapper.toResponse(user),
                accounts,
                recentTransactions
        );

    }

}