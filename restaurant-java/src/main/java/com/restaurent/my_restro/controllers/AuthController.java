package com.restaurent.my_restro.controllers;

import com.restaurent.my_restro.dtos.AuthenticationRequest;
import com.restaurent.my_restro.dtos.AuthenticationResponse;
import com.restaurent.my_restro.dtos.SignUpRequest;
import com.restaurent.my_restro.dtos.UserDto;
import com.restaurent.my_restro.entities.UserEntity;
import com.restaurent.my_restro.repositories.UserRepo;
import com.restaurent.my_restro.services.auth.AuthService;
import com.restaurent.my_restro.services.jwt.UserDetailServiceImpl;
import com.restaurent.my_restro.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDetailServiceImpl userDetailService;

    @Autowired
    UserRepo userRepo;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody SignUpRequest signUpRequest){
        UserDto createdUserDto = authService.createUser(signUpRequest);
        if (Objects.isNull(createdUserDto))
            return new ResponseEntity<>("User Not Created. Come again", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(createdUserDto, HttpStatus.OK);
    }

    @PostMapping("/login")
    public AuthenticationResponse createAuthToken(@RequestBody AuthenticationRequest authReq, HttpServletResponse response) throws IOException {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authReq.getEmail(), authReq.getPassword()));
        } catch (BadCredentialsException e){
            throw new BadCredentialsException("Incorrect Username or Password");
        } catch (DisabledException e){
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "User not active");
            return null;
        }

        final UserDetails userDetails = userDetailService.loadUserByUsername(authReq.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);
        Optional<UserEntity> optUser = userRepo.findFirstByEmail(userDetails.getUsername());
        AuthenticationResponse authResponse = new AuthenticationResponse();
        if (optUser.isPresent()){
            authResponse.setJwt(jwt);
            authResponse.setUserRole(optUser.get().getRole());
            authResponse.setUserId(optUser.get().getId());
        }
        return authResponse;
    }
}
