package com.restaurent.my_restro.services.customer;

import com.restaurent.my_restro.dtos.CategoryDto;
import com.restaurent.my_restro.dtos.ProductDto;
import com.restaurent.my_restro.dtos.ReservationDto;

import java.util.List;

public interface CustomerService {

    List<CategoryDto> getAllCategories();

    List<ProductDto> getProductsByCategory(Long categoryId);

    ReservationDto createReservation(ReservationDto reservationDto);

    List<ReservationDto> getReservationsByUser(Long customerId);
}
