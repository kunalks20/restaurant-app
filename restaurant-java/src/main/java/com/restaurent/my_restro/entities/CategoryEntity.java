package com.restaurent.my_restro.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Table
@Entity(name = "category")
@Data
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @Lob
    @Column
    private byte[] img;
}
