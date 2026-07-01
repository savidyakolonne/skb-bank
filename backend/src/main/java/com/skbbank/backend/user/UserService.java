package com.skbbank.backend.user;

import com.skbbank.backend.common.exception.EmailAlreadyExistsException;
import com.skbbank.backend.common.exception.UserNotFoundException;
import com.skbbank.backend.user.dto.CreateUserRequest;
import com.skbbank.backend.user.dto.UpdateUserRequest;
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

    public UserService(
            UserRepository userRepository,
            UserMapper userMapper,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
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
}