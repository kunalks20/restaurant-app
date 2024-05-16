package com.restaurent.my_restro.controllers;

import com.restaurent.my_restro.dtos.CategoryDto;
import com.restaurent.my_restro.dtos.ProductDto;
import com.restaurent.my_restro.dtos.ReservationDto;
import com.restaurent.my_restro.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
public class AdminController {


    private final AdminService adminService;

    @PostMapping("/category")
    public ResponseEntity<CategoryDto> postCategory(@ModelAttribute CategoryDto categoryDto) throws IOException {
        CategoryDto response = adminService.postCategory(categoryDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/categories")
    public  ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<CategoryDto> categoryDtoList = adminService.getAllCategories();
        return ResponseEntity.ok(categoryDtoList);
    }

    //Product Operations
    @PostMapping("/{categoryId}/product")
    public ResponseEntity<ProductDto> postProduct(@PathVariable Long categoryId, @ModelAttribute ProductDto productDto) {
        ProductDto response = adminService.postProduct(categoryId, productDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{categoryId}/products")
    public ResponseEntity<List<ProductDto>> getAllProductsByCategoryId(@PathVariable Long categoryId) {
        List<ProductDto> response = adminService.getAllProductsByCategoryId(categoryId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long productId) {
        adminService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long productId) {
        ProductDto response = adminService.getProductById(productId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/product/{productId}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long productId, @ModelAttribute ProductDto productDto) throws IOException {
        ProductDto response = adminService.updateProduct(productId, productDto);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/reservations")
    public ResponseEntity<List<ReservationDto>> getReservationsB() {
        List<ReservationDto> response = adminService.getReservations();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/change-reservation-status")
    public ResponseEntity<ReservationDto> changeReservationStatus(@RequestParam(name = "id") Long reservationId, @RequestParam String status) {
        ReservationDto response = adminService.changeReservationStatus(reservationId, status);
        return ResponseEntity.ok(response);
    }

}
