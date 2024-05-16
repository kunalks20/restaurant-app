package com.restaurent.my_restro.services.jwt;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {

    UserDetailsService userDetailsService();
}
