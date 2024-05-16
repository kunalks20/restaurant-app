package com.restaurent.my_restro.services.auth;

import com.restaurent.my_restro.dtos.SignUpRequest;
import com.restaurent.my_restro.dtos.UserDto;
import com.restaurent.my_restro.entities.UserEntity;
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
        Optional<UserEntity> admin = userRepo.findByRole(UserRole.ADMIN);
        if (admin.isEmpty()){
            UserEntity adminUserEntity = new UserEntity();
            adminUserEntity.setName("Admin");
            adminUserEntity.setEmail("admin@my_restro.com");
            adminUserEntity.setPassword(passwordEncoder.encode("admin123"));
            adminUserEntity.setRole(UserRole.ADMIN);
            userRepo.save(adminUserEntity);
        }
    }

    @Override
    public UserDto createUser(SignUpRequest signUpRequest) {
        UserEntity userEntity = new UserEntity();
        userEntity.setName(signUpRequest.getName());
        userEntity.setEmail(signUpRequest.getEmail());
        userEntity.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        userEntity.setRole(UserRole.CUSTOMER);
        UserEntity createdUserEntity = userRepo.save(userEntity);
        UserDto createdUserDto = new UserDto();
        createdUserDto.setEmail(createdUserEntity.getEmail());
        createdUserDto.setRole(createdUserEntity.getRole());
        createdUserDto.setName(createdUserEntity.getName());
        return createdUserDto;
    }
}
