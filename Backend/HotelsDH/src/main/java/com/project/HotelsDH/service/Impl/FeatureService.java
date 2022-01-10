package com.project.HotelsDH.service.Impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.HotelsDH.model.Feature;
import com.project.HotelsDH.model.dto.FeatureDTO;
import com.project.HotelsDH.repository.IFeatureRepository;
import com.project.HotelsDH.service.IFeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class FeatureService implements IFeatureService {
    @Autowired
    IFeatureRepository featureRepository;

    @Autowired
    ObjectMapper mapper;

    @Override
    public Collection<FeatureDTO> getAll() {
        List<Feature> features = featureRepository.findAll();

        Set<FeatureDTO> featureDTOS = new HashSet<>();
        for (Feature feature : features){
            featureDTOS.add(mapper.convertValue(feature,FeatureDTO.class));
        }
        return featureDTOS;
    }
}
