package com.project.HotelsDH.controller;
import com.project.HotelsDH.model.dto.CityDTO;
import com.project.HotelsDH.service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/cities")
@CrossOrigin
public class CityController {
    private final ICityService cityService;

    @Autowired
    public CityController(ICityService cityService) {
        this.cityService = cityService;
    }

    @PreAuthorize("hasRole('ADMIN')") /** solo el administrador puede agregar ciudades */
    @PostMapping("/add")
    public ResponseEntity<?> addCity(@RequestBody CityDTO city) {
            cityService.createCity(city);
        return ResponseEntity.status(HttpStatus.CREATED).body("City added successfully");
    }

    @GetMapping("/list")
    public Collection<CityDTO> listCities()
    {
        return cityService.getAll();
    }


}
