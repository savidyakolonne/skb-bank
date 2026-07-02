package com.skbbank.backend.user;

import com.skbbank.backend.common.response.ApiResponse;
import com.skbbank.backend.user.dto.CreateUserRequest;
import com.skbbank.backend.user.dto.UpdateUserRequest;
import com.skbbank.backend.user.dto.UserResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name = "Users",
        description = "User Management APIs"
)
@SecurityRequirement(name = "Bearer Authentication")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    // Get all users
    @Operation(summary = "Get all users")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ApiResponse<List<UserResponse>> getAllUsers(){

        return new ApiResponse<>(
                true,
                "Users retrieved successfully",
                userService.getAllUsers()
        );
    }

    // Get user by ID
    @Operation(summary = "Get user by id")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/{id}")
    public ApiResponse<UserResponse> getUserById(
            @PathVariable Long id
    ){

        return new ApiResponse<>(
                true,
                "User retrieved successfully",
                userService.getUserById(id)
        );
    }

    // Create user
    @Operation(summary = "Create new user")
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping
    public ApiResponse<UserResponse> createUser(
            @Valid @RequestBody CreateUserRequest request
    ){

        return new ApiResponse<>(
                true,
                "User created successfully",
                userService.createUser(request)
        );
    }

    // Update user
    @Operation(summary = "Update user")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PutMapping("/{id}")
    public ApiResponse<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request
    ){

        return new ApiResponse<>(
                true,
                "User updated successfully",
                userService.updateUser(id, request)
        );
    }

    // Delete user
    @Operation(summary = "Delete user")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteUser(
            @PathVariable Long id
    ){

        userService.deleteUser(id);

        return new ApiResponse<>(
                true,
                "User deleted successfully",
                null
        );
    }
}