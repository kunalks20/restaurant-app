package com.restaurent.my_restro.services.admin;

import com.restaurent.my_restro.dtos.CategoryDto;
import com.restaurent.my_restro.dtos.ProductDto;
import com.restaurent.my_restro.dtos.ReservationDto;

import java.io.IOException;
import java.util.List;

public interface AdminService {
    CategoryDto postCategory(CategoryDto categoryDto) throws IOException;

    List<CategoryDto> getAllCategories();

    ProductDto postProduct(Long categoryId, ProductDto productDto);

    List<ProductDto> getAllProductsByCategoryId(Long categoryId);

    void deleteProduct(Long productId);

    ProductDto getProductById(Long productId);

    ProductDto updateProduct(Long productId, ProductDto productDto) throws IOException;

    List<ReservationDto> getReservations();

    ReservationDto changeReservationStatus(Long reservationId, String status);
}
