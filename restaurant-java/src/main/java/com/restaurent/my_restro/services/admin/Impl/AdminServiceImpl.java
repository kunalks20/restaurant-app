package com.restaurent.my_restro.services.admin.Impl;

import com.restaurent.my_restro.dtos.CategoryDto;
import com.restaurent.my_restro.dtos.ProductDto;
import com.restaurent.my_restro.dtos.ReservationDto;
import com.restaurent.my_restro.entities.CategoryEntity;
import com.restaurent.my_restro.entities.ProductEntity;
import com.restaurent.my_restro.entities.ReservationEntity;
import com.restaurent.my_restro.enums.ReservationStatus;
import com.restaurent.my_restro.mapper.GeneralMapper;
import com.restaurent.my_restro.repositories.CategoryRepo;
import com.restaurent.my_restro.repositories.ProductRepo;
import com.restaurent.my_restro.repositories.ReservationRepo;
import com.restaurent.my_restro.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final CategoryRepo categoryRepo;

    private final GeneralMapper mapper;

    private final ProductRepo productRepo;

    private final ReservationRepo reservationRepo;

    @Override
    public CategoryDto postCategory(CategoryDto categoryDto) throws IOException {
        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setName(categoryDto.getName());
        categoryEntity.setDescription(categoryDto.getDescription());
        categoryEntity.setImg(categoryDto.getImg().getBytes());

        CategoryEntity createdCategory = categoryRepo.save(categoryEntity);
        CategoryDto returnCategoryDto = new CategoryDto();
        returnCategoryDto.setName(createdCategory.getName());
        returnCategoryDto.setDescription(createdCategory.getDescription());
        return returnCategoryDto;
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        return categoryRepo.findAll().stream()
                .map(item -> mapper.mapCategoryEntityToDTO(item))
                .collect(Collectors.toList());
    }

    //Product Operations
    @Override
    public ProductDto postProduct(Long categoryId, ProductDto productDto) {
        Optional<CategoryEntity> category = categoryRepo.findById(categoryId);
        ProductDto response = new ProductDto();
        category.ifPresentOrElse(entity -> {
            ProductEntity productEntity = new ProductEntity();
            BeanUtils.copyProperties(productDto, productEntity);
                    try {
                        productEntity.setImg(productDto.getImg().getBytes());
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                    productEntity.setCategory(entity);
                    ProductEntity savedProductEntity = productRepo.save(productEntity);
                    response.setId(savedProductEntity.getId());
        },
                ()-> {
            throw new RuntimeException("Category not found");
        });
        return response;
    }

    @Override
    public List<ProductDto> getAllProductsByCategoryId(Long categoryId) {
        List<ProductDto> response = productRepo.findAllByCategoryId(categoryId).stream()
                .map(entity -> mapper.mapProductEntityToDTO(entity))
                .collect(Collectors.toList());
        return response;
    }

    @Override
    public void deleteProduct(Long productId) {
        Optional<ProductEntity> productEntity = productRepo.findById(productId);
        productEntity.ifPresentOrElse(productRepo::delete, () -> {
            throw new IllegalArgumentException("Product with id:"+ productId +" not found");
        });
    }

    @Override
    public ProductDto getProductById(Long productId) {
        Optional<ProductEntity> optProductEntity = productRepo.findById(productId);
        ProductDto response = optProductEntity.map(entity -> mapper.mapProductEntityToDTO(entity))
                .orElseThrow(() -> new IllegalArgumentException("Product with id:" + productId + " not found"));
        return response;
    }

    @Override
    public ProductDto updateProduct(Long productId, ProductDto productDto) throws IOException {
        Optional<ProductEntity> optProductEntity = productRepo.findById(productId);
        if (optProductEntity.isPresent()) {
            ProductEntity entity = optProductEntity.get();
            entity.setName(productDto.getName());
            entity.setDescription(productDto.getDescription());
            entity.setPrice(productDto.getPrice());
            if (productDto.getImg() != null) {
                entity.setImg(productDto.getImg().getBytes());
            }
            return mapper.mapProductEntityToDTO(productRepo.save(entity));
        }
        throw new IllegalArgumentException("Product with id:" + productId + " not found");
    }

    @Override
    public List<ReservationDto> getReservations() {
        return reservationRepo.findAll().stream()
                .map(entity -> mapper.mapReservationEntityToDto(entity))
                .collect(Collectors.toList());
    }

    @Override
    public ReservationDto changeReservationStatus(Long reservationId, String status) {
        ReservationDto response = reservationRepo.findById(reservationId)
                .map(entity -> {
                    entity.setReservationStatus(status.equals("Approve") ? ReservationStatus.APPROVED : ReservationStatus.DISAPPROVED);
                    return mapper.mapReservationEntityToDto(reservationRepo.save(entity));
                })
                .orElseThrow(() -> new IllegalArgumentException("Reservation with id:" + reservationId + " not found"));

        return response;
    }
}
