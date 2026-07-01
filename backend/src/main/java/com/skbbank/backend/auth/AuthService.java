package com.skbbank.backend.auth;

import com.skbbank.backend.common.exception.EmailAlreadyExistsException;
import com.skbbank.backend.common.exception.UserNotFoundException;
import com.skbbank.backend.common.exception.InvalidPasswordException;
import com.skbbank.backend.common.security.JwtService;
import com.skbbank.backend.user.User;
import com.skbbank.backend.user.UserRepository;
import com.skbbank.backend.user.enums.Role;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User register(RegisterRequest request){

        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new EmailAlreadyExistsException();
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        return userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request){

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(UserNotFoundException::new);

        if(!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )){
            throw new InvalidPasswordException();
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token);

    }

}
