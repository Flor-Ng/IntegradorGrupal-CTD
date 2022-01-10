package com.project.HotelsDH.controller;
import com.project.HotelsDH.model.dto.ProductDTO;
import com.project.HotelsDH.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collection;

@RestController
@RequestMapping("/products")
@CrossOrigin
public class ProductController {
    private final IProductService productService;

    @Autowired
    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @PreAuthorize("hasRole('ADMIN')") /** solo el administrador puede publicar producto */
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody ProductDTO product) {
        productService.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body("Product created successfully");
    }

    @GetMapping("/list")
    public Collection<ProductDTO> listProducts()
    {
        return productService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable long id){
        ProductDTO productDTO = productService.readProduct(id);
        if (productDTO != null) {
            return new ResponseEntity<ProductDTO>(productDTO, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/cities")
    public ResponseEntity<?> getProductsByCity(String name){
        if(name != null){
            return ResponseEntity.ok(productService.findAllByCityName(name));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getProductsByCategory(String title){
        if(title != null){
            return ResponseEntity.ok(productService.findAllByCategoriesTitle(title));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/date")
    public ResponseEntity<?> getProductsByDateAndCity(@RequestParam ("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate, @RequestParam ("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate, String city){
        if(startDate != null && endDate != null && city != null){
            if (endDate.isBefore(startDate)){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid date, endDate must be after startDate");
            }
            if (startDate.isBefore(LocalDate.now())){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The startDate must be after the current date");
            }
            return ResponseEntity.ok(productService.findByCityAndDate(startDate, endDate, city));
        }
        return ResponseEntity.badRequest().build();
    }

    @PreAuthorize("hasRole('ADMIN')") /** solo el administrador puede actualizar productos */
    @PutMapping("/update")
    public ResponseEntity<?> updateProduct(@RequestBody ProductDTO product)
    {
        productService.updateProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body("Product updated successfully");
    }


}
