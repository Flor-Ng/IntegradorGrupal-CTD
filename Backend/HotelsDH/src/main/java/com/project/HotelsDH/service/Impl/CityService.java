package com.project.HotelsDH.service.Impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.HotelsDH.model.City;
import com.project.HotelsDH.model.dto.CityDTO;
import com.project.HotelsDH.repository.ICityRepository;
import com.project.HotelsDH.service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CityService implements ICityService {

    @Autowired
    ICityRepository cityRepository;

    @Autowired
    ObjectMapper mapper;

    public void createCity(CityDTO cityDTO){

        City city= mapper.convertValue(cityDTO, City.class);
        cityRepository.save(city);
    }

    public CityDTO readCity(Long id){

        CityDTO cityDTO = null;
        Optional<City> city = cityRepository.findById(id);
        if(city.isPresent()){
            cityDTO = mapper.convertValue(city, CityDTO.class);
        }
        return cityDTO;
    }

    public void updateCity(CityDTO cityDTO){
        City city = mapper.convertValue(cityDTO, City.class);
        cityRepository.save(city);
    }

    public void deleteCity(Long id){

        cityRepository.deleteById(id);
    }

    public Collection<CityDTO> getAll(){

        List<City> cities = cityRepository.findAll();

        Set<CityDTO> cityDTOS = new HashSet<>();
        for (City city : cities){
            cityDTOS.add(mapper.convertValue(city,CityDTO.class));
        }
        return cityDTOS;
    }
}
