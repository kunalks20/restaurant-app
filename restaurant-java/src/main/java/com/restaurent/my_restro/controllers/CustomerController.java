package com.restaurent.my_restro.controllers;

import com.restaurent.my_restro.dtos.CategoryDto;
import com.restaurent.my_restro.dtos.ProductDto;
import com.restaurent.my_restro.dtos.ReservationDto;
import com.restaurent.my_restro.services.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<CategoryDto> categoryDtoList = customerService.getAllCategories();
        return ResponseEntity.ok(categoryDtoList);
    }


    // Product Operations
    @GetMapping("/{categoryId}/products")
    public ResponseEntity<List<ProductDto>> getProductsByCategory(@PathVariable Long categoryId) {
        List<ProductDto> response = customerService.getProductsByCategory(categoryId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("reservation")
    public ResponseEntity<ReservationDto> createReservation(@RequestBody ReservationDto reservationDto) {
        ReservationDto response = customerService.createReservation(reservationDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/reservations/{customerId}")
    public ResponseEntity<List<ReservationDto>> getReservationsB(@PathVariable Long customerId) {
        List<ReservationDto> response = customerService.getReservationsByUser(customerId);
        return ResponseEntity.ok(response);
    }

}
