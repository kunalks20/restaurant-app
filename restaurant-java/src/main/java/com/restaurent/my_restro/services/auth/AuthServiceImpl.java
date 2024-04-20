package com.restaurent.my_restro.services.auth;

import com.restaurent.my_restro.dtos.SignUpRequest;
import com.restaurent.my_restro.dtos.UserDto;
import com.restaurent.my_restro.entities.User;
import com.restaurent.my_restro.enums.UserRole;
import com.restaurent.my_restro.repositories.UserRepo;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService{

    @Autowired
    UserRepo userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostConstruct
    public void createAdminAccount(){
        Optional<User> admin = userRepo.findByRole(UserRole.ADMIN);
        if (admin.isEmpty()){
            User adminUser = new User();
            adminUser.setName("Admin");
            adminUser.setEmail("admin@my_restro.com");
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setRole(UserRole.ADMIN);
            userRepo.save(adminUser);
        }
    }

    @Override
    public UserDto createUser(SignUpRequest signUpRequest) {
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setRole(UserRole.CUSTOMER);
        User createdUser = userRepo.save(user);
        UserDto createdUserDto = new UserDto();
        createdUserDto.setEmail(createdUser.getEmail());
        createdUserDto.setRole(createdUser.getRole());
        createdUserDto.setName(createdUser.getName());
        return createdUserDto;
    }
}
