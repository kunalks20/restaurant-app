package com.restaurent.my_restro.repositories;

import com.restaurent.my_restro.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends JpaRepository<CategoryEntity, Long> {
}
