package com.restaurent.my_restro.dtos;

import com.restaurent.my_restro.enums.UserRole;
import lombok.Builder;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt;

    private UserRole userRole;

    private Long userId;
}
