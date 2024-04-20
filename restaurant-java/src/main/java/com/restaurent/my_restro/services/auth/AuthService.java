package com.restaurent.my_restro.services.auth;

import com.restaurent.my_restro.dtos.SignUpRequest;
import com.restaurent.my_restro.dtos.UserDto;

public interface AuthService {
    UserDto createUser(SignUpRequest signUpRequest);
}
