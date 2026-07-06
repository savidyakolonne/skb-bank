package com.skbbank.backend.auth.dto;

import com.skbbank.backend.user.dto.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

    private String token;

    private UserResponse user;

}