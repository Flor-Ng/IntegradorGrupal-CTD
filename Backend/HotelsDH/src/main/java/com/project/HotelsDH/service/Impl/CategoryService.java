package com.project.HotelsDH.service.Impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.HotelsDH.model.Category;
import com.project.HotelsDH.model.dto.CategoryDTO;
import com.project.HotelsDH.repository.ICategoryRepository;
import com.project.HotelsDH.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    ICategoryRepository categoryRepository;

    @Autowired
    ObjectMapper mapper;

    public void createCategory(CategoryDTO categoryDTO){

        Category category= mapper.convertValue(categoryDTO, Category.class);
        categoryRepository.save(category);
    }

    public CategoryDTO readCategory(Long id){

        CategoryDTO categoryDTO = null;
        Optional<Category> category = categoryRepository.findById(id);
        if(category.isPresent()){
            categoryDTO = mapper.convertValue(category, CategoryDTO.class);
        }
        return categoryDTO;
    }

    public void updateCategory(CategoryDTO categoryDTO){
        Category category = mapper.convertValue(categoryDTO, Category.class);
        categoryRepository.save(category);
    }

    public void deleteCategory(Long id){

        categoryRepository.deleteById(id);
    }

    public Collection<CategoryDTO> getAll(){

        List<Category> categories = categoryRepository.findAll();

        Set<CategoryDTO> categoryDTOS = new HashSet<>();
        for (Category category : categories){
            categoryDTOS.add(mapper.convertValue(category,CategoryDTO.class));
        }
        return categoryDTOS;
    }
}
