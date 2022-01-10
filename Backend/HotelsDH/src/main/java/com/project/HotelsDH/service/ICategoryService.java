package com.project.HotelsDH.service;

import com.project.HotelsDH.model.dto.CategoryDTO;

import java.util.Collection;

public interface ICategoryService {

    void createCategory(CategoryDTO categoryDTO);

    CategoryDTO readCategory(Long id);

    void updateCategory(CategoryDTO categoryDTO);

    void deleteCategory(Long id);

    Collection<CategoryDTO> getAll();
}
