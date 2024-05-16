package com.restaurent.my_restro.mapper;

import com.restaurent.my_restro.dtos.CategoryDto;
import com.restaurent.my_restro.dtos.ProductDto;
import com.restaurent.my_restro.dtos.ReservationDto;
import com.restaurent.my_restro.entities.CategoryEntity;
import com.restaurent.my_restro.entities.ProductEntity;
import com.restaurent.my_restro.entities.ReservationEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GeneralMapper {

    @Mapping(target = "img", source = "img", ignore = true)
    @Mapping(target = "returnedImg", source = "img")
    CategoryDto mapCategoryEntityToDTO(CategoryEntity categoryEntity);

    @Mapping(target = "img", source = "img", ignore = true)
    @Mapping(target = "returnedImg", source = "img")
    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "categoryName", source = "category.name")
    ProductDto mapProductEntityToDTO(ProductEntity productEntity);

    ReservationEntity mapReservationDtoToEntity(ReservationDto reservationDto);

    @Mapping(target = "customerName", source = "userEntity.name")
    @Mapping(target = "customerId", source = "userEntity.id")
    ReservationDto mapReservationEntityToDto(ReservationEntity reservationEntity);

}
