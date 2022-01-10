package com.project.HotelsDH.service;
import com.project.HotelsDH.model.Product;
import com.project.HotelsDH.model.dto.ProductDTO;

import java.time.LocalDate;
import java.util.Collection;

public interface IProductService {

    void createProduct(ProductDTO productDTO);

    Collection<ProductDTO> getAll();

    ProductDTO readProduct(Long id);

    void updateProduct(ProductDTO productDTO);

    void deleteProduct(Long id);

    Collection<ProductDTO> findAllByCityName(String name);
    Collection<ProductDTO> findAllByCategoriesTitle(String title);
    Collection<ProductDTO> findByCityAndDate(LocalDate startDate, LocalDate endDate, String name);
}
