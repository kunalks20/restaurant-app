package com.restaurent.my_restro.repositories;

import com.restaurent.my_restro.entities.UserEntity;
import com.restaurent.my_restro.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findFirstByEmail(String email);

    Optional<UserEntity> findByRole(UserRole userRole);
}
