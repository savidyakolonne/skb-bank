package com.skbbank.backend.user.dto;

import com.skbbank.backend.user.enums.Role;
import lombok.Data;

@Data
public class UserResponse {

    private Long id;

    private String name;

    private String email;

    private Role role;
}
