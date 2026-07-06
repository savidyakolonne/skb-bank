package com.skbbank.backend.auth;

import com.skbbank.backend.auth.dto.LoginRequest;
import com.skbbank.backend.auth.dto.LoginResponse;
import com.skbbank.backend.auth.dto.RegisterRequest;
import com.skbbank.backend.common.response.ApiResponse;
import com.skbbank.backend.user.dto.UserResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Authentication",
        description = "Authentication APIs"
)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @Operation(summary = "Register a new user")
    @PostMapping("/register")
    public ApiResponse<UserResponse> register(
            @Valid @RequestBody RegisterRequest request){

        UserResponse user = authService.register(request);

        return new ApiResponse<>(
                true,
                "User registered successfully",
                user
        );
    }

    @Operation(summary = "Authenticate user and generate JWT")
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(
            @Valid @RequestBody LoginRequest request){

        LoginResponse response = authService.login(request);

        return new ApiResponse<>(
                true,
                "Login successful",
                response
        );
    }

}
