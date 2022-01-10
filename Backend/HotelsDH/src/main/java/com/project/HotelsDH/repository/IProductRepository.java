package com.project.HotelsDH.repository;

import com.project.HotelsDH.model.Product;
import com.project.HotelsDH.model.dto.ProductDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collection;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {
    Collection<Product> findAllByCityName(String name);

    Collection<Product> findAllByCategoriesTitle(String title);
}
