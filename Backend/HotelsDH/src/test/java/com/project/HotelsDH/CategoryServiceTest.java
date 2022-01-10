package com.project.HotelsDH;

import com.project.HotelsDH.model.dto.CategoryDTO;
import com.project.HotelsDH.service.Impl.CategoryService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collection;

@SpringBootTest
class CategoryServiceTest {
    @Autowired
    private CategoryService categoryService;

    @BeforeEach
    public void guardarDatos() {
        CategoryDTO category = new CategoryDTO();
        category.setTitle("Testing Cat 1");
        category.setDescription("Description for Testing Cat 1");
        category.setUrlImage("https://testing-cat-1.com/");
        categoryService.createCategory(category);
    }

    @Test
    public void guardar() {
        CategoryDTO category = new CategoryDTO();
        category.setTitle("Testing Cat 2");
        category.setDescription("Description for Testing Cat 2");
        category.setUrlImage("https://testing-cat-2.com/");
        categoryService.createCategory(category);
        Assertions.assertTrue(category.getTitle() != null);
    }

    @Test
    public void listar() {
        Collection<CategoryDTO> categoryDTOS = categoryService.getAll();
        Assertions.assertTrue(!categoryDTOS.isEmpty());
    }

    @Test
    public void buscar() {
        CategoryDTO categoryDTO  = categoryService.readCategory(1L);
        System.out.println(categoryDTO);
        Assertions.assertTrue(categoryDTO.getId().equals(1L));
    }

    @Test
    public void eliminar() {
        categoryService.deleteCategory(1L);
        CategoryDTO categoryDTO  = categoryService.readCategory(1L);
        Assertions.assertTrue(categoryDTO == null);
    }

    @Test
    public void actualizar() {
        CategoryDTO category = new CategoryDTO();
        category.setTitle("Testing Cat 2b");
        category.setDescription("Description for Testing Cat 2b");
        category.setUrlImage("https://testing-cat-2b.com/");
        categoryService.updateCategory(category);
        Assertions.assertEquals("Testing Cat 2b", category.getTitle());
    }
}