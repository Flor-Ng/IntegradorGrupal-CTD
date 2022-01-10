package com.project.HotelsDH.controller;

import com.project.HotelsDH.model.dto.FeatureDTO;
import com.project.HotelsDH.service.IFeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/features")
@CrossOrigin
public class FeatureController {
    private final IFeatureService iFeatureService;

    @Autowired
    public FeatureController(IFeatureService iFeatureService) {
        this.iFeatureService = iFeatureService;
    }

    /** Metodo para listar "caracteristicas" de todos los producto*/
    @GetMapping("/list")
    public Collection<FeatureDTO> listFeatures()
    {
        return iFeatureService.getAll();
    }

}
