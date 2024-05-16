package com.restaurent.my_restro.repositories;

import com.restaurent.my_restro.dtos.ProductDto;
import com.restaurent.my_restro.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<ProductEntity, Long> {
    List<ProductEntity> findAllByCategoryId(Long categoryId);
}
