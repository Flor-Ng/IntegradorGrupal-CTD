package com.project.HotelsDH.controller;
import com.project.HotelsDH.model.dto.ImageDTO;
import com.project.HotelsDH.service.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/images")
@CrossOrigin
public class ImageController {
    private final IImageService imageService;

    @Autowired
    public ImageController(IImageService imageService) {
        this.imageService = imageService;
    }

    @PreAuthorize("hasRole('ADMIN')") /** solo el administrador puede agregar imagenes */
    @PostMapping("/add")
    public ResponseEntity<?> addImage(@RequestBody ImageDTO image) {
        imageService.createImage(image);
        return ResponseEntity.status(HttpStatus.CREATED).body("Image added successfully");
    }

}
