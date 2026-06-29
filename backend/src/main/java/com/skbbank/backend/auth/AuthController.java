package com.skbbank.backend.auth;

import com.skbbank.backend.common.response.ApiResponse;
import com.skbbank.backend.user.User;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/register")
    public ApiResponse<User> register(
            @Valid @RequestBody RegisterRequest request){

        User user = authService.register(request);

        return new ApiResponse<>(
                true,
                "User registered successfully",
                user
        );
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(
            @Valid @RequestBody LoginRequest request){

        AuthResponse response = authService.login(request);

        return new ApiResponse<>(
                true,
                "Login successful",
                response
        );
    }

}
