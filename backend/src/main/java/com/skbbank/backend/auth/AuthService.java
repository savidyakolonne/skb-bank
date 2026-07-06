package com.skbbank.backend.auth;

import com.skbbank.backend.auth.dto.LoginRequest;
import com.skbbank.backend.auth.dto.LoginResponse;
import com.skbbank.backend.auth.dto.RegisterRequest;
import com.skbbank.backend.common.exception.EmailAlreadyExistsException;
import com.skbbank.backend.common.exception.UserNotFoundException;
import com.skbbank.backend.common.exception.InvalidPasswordException;
import com.skbbank.backend.common.security.JwtService;
import com.skbbank.backend.user.User;
import com.skbbank.backend.user.UserRepository;
import com.skbbank.backend.user.dto.UserResponse;
import com.skbbank.backend.user.enums.Role;
import com.skbbank.backend.user.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserMapper userMapper;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            UserMapper userMapper
    ){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userMapper = userMapper;
    }

    public UserResponse register(RegisterRequest request){

        if(userRepository.findByEmail(request.getEmail()).isPresent()){
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

    public LoginResponse login(LoginRequest request){

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(UserNotFoundException::new);

        if(!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )){
            throw new InvalidPasswordException();
        }

        String token = jwtService.generateToken(user.getEmail());

        UserResponse userResponse = userMapper.toResponse(user);

        return new LoginResponse(
                token,
                userResponse
        );
    }
}
