package com.restaurent.my_restro.dtos;

import com.restaurent.my_restro.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {

    private String name;

    private String email;

    private String password;

    private UserRole role;
}
