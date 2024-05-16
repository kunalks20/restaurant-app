package com.restaurent.my_restro.services.customer.impl;

import com.restaurent.my_restro.dtos.CategoryDto;
import com.restaurent.my_restro.dtos.ProductDto;
import com.restaurent.my_restro.dtos.ReservationDto;
import com.restaurent.my_restro.entities.ReservationEntity;
import com.restaurent.my_restro.entities.UserEntity;
import com.restaurent.my_restro.enums.ReservationStatus;
import com.restaurent.my_restro.mapper.GeneralMapper;
import com.restaurent.my_restro.repositories.CategoryRepo;
import com.restaurent.my_restro.repositories.ProductRepo;
import com.restaurent.my_restro.repositories.ReservationRepo;
import com.restaurent.my_restro.repositories.UserRepo;
import com.restaurent.my_restro.services.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CategoryRepo categoryRepo;

    private final ProductRepo productRepo;

    private final GeneralMapper mapper;

    private final ReservationRepo reservationRepo;

    private final UserRepo userRepo;

    @Override
    public List<CategoryDto> getAllCategories() {
        return categoryRepo.findAll().stream()
                .map(item -> mapper.mapCategoryEntityToDTO(item))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> getProductsByCategory(Long categoryId) {
        List<ProductDto> response = productRepo.findAllByCategoryId(categoryId).stream()
                .map(entity -> mapper.mapProductEntityToDTO(entity))
                .collect(Collectors.toList());
        return response;
    }

    @Override
    public ReservationDto createReservation(@ModelAttribute ReservationDto reservationDto) {
        Optional<UserEntity> user = userRepo.findById(reservationDto.getCustomerId());
        if (user.isPresent()) {
            ReservationEntity entity = mapper.mapReservationDtoToEntity(reservationDto);
            entity.setUserEntity(user.get());
            entity.setReservationStatus(ReservationStatus.PENDING);
            return mapper.mapReservationEntityToDto(reservationRepo.save(entity));
        }
        throw new IllegalArgumentException("User with id:" + reservationDto.getCustomerId() + " not found");
    }

    @Override
    public List<ReservationDto> getReservationsByUser(Long customerId) {
        return reservationRepo.findAllByUserId(customerId).stream()
                .map(entity -> mapper.mapReservationEntityToDto(entity))
                .collect(Collectors.toList());
    }
}
