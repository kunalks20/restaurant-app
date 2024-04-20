package com.restaurent.my_restro.repositories;

import com.restaurent.my_restro.entities.User;
import com.restaurent.my_restro.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findFirstByEmail(String email);

    Optional<User> findByRole(UserRole userRole);
}
