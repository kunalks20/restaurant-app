package com.restaurent.my_restro.services.jwt;

import com.restaurent.my_restro.repositories.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepo userRepo;
    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return userRepo.findFirstByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
            }
        };
    }
}
