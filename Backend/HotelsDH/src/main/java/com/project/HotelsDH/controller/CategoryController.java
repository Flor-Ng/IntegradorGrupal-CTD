package com.project.HotelsDH.controller;

import com.project.HotelsDH.model.dto.CategoryDTO;
import com.project.HotelsDH.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/categories")
@CrossOrigin
public class CategoryController {
    private final ICategoryService categoryService;

    @Autowired
    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PreAuthorize("hasRole('ADMIN')") /** solo el administrador puede agregar categorias */
    @PostMapping("/add")
    public ResponseEntity<?> addCategory(@RequestBody CategoryDTO category) {
        categoryService.createCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body("Category created successfully");
    }

    @GetMapping("/list")
    public Collection<CategoryDTO> listCategories()
    {
        return categoryService.getAll();
    }

    @PreAuthorize("hasRole('ADMIN')") /** solo el administrador puede actualizar categorias */
    @PutMapping("/update")
    public ResponseEntity<?> updateCategory(@RequestBody CategoryDTO category)
    {
        categoryService.updateCategory(category);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')") /** solo el administrador puede eliminar categorias */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable long id)
    {
        categoryService.deleteCategory(id);
        return ResponseEntity.status(HttpStatus.OK).body("Category removed.");
    }



}
