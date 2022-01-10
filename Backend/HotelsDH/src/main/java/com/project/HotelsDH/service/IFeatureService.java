package com.project.HotelsDH.service;
import com.project.HotelsDH.model.dto.FeatureDTO;

import java.util.Collection;

public interface IFeatureService {
    Collection<FeatureDTO> getAll();
}
