package com.restaurent.my_restro.services.jwt;

import com.restaurent.my_restro.entities.UserEntity;
import com.restaurent.my_restro.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Optional;

@Component
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserEntity> optionalUser =  userRepo.findFirstByEmail(email);
        if (optionalUser.isEmpty()) throw new UsernameNotFoundException("User not found", null);
        return new org.springframework.security.core.userdetails.User(optionalUser.get().getEmail(), optionalUser.get().getPassword(), new ArrayList<>());
    }
}
