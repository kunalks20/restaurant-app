package com.restaurent.my_restro.repositories;

import com.restaurent.my_restro.entities.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepo extends JpaRepository<ReservationEntity, Long> {
    @Query("SELECT h FROM ReservationEntity h WHERE h.userEntity.id = :customerId")
    List<ReservationEntity> findAllByUserId(Long customerId);
}
