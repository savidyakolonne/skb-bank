package com.skbbank.backend.user;

import com.skbbank.backend.common.response.ApiResponse;
import com.skbbank.backend.user.dto.CreateUserRequest;
import com.skbbank.backend.user.dto.UpdateUserRequest;
import com.skbbank.backend.user.dto.UserResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    // Get all users
    @GetMapping
    public ApiResponse<List<UserResponse>> getAllUsers(){

        return new ApiResponse<>(
                true,
                "Users retrieved successfully",
                userService.getAllUsers()
        );
    }

    // Get user by ID
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