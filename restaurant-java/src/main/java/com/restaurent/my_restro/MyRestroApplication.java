package com.restaurent.my_restro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class MyRestroApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyRestroApplication.class, args);
	}

}
