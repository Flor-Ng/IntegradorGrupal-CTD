package com.project.HotelsDH.service;

import com.project.HotelsDH.model.dto.CityDTO;

import java.util.Collection;

public interface ICityService {

    void createCity(CityDTO cityDTO);

    Collection<CityDTO> getAll();

    CityDTO readCity(Long id);

    void updateCity(CityDTO cityDTO);

    void deleteCity(Long id);
}
