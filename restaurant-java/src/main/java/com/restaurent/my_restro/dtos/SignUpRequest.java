package com.restaurent.my_restro.dtos;

import lombok.Data;

@Data
public class SignUpRequest {
    private String name;

    private String email;

    private String password;
}
