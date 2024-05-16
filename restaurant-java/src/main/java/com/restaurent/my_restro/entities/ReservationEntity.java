package com.restaurent.my_restro.entities;

import com.restaurent.my_restro.enums.ReservationStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Data
@Table(name = "reservation")
public class ReservationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tableType;

    private String description;

    private Date dateTime;

    private ReservationStatus reservationStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity userEntity;
}
