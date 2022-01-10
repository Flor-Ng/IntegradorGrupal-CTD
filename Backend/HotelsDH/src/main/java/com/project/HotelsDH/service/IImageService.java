package com.project.HotelsDH.service;

import com.project.HotelsDH.model.dto.ImageDTO;

import java.util.Collection;

public interface IImageService {

    void createImage(ImageDTO imageDTO);

    Collection<ImageDTO> getAll();

    ImageDTO readImage(Long id);

    void updateImage(ImageDTO imageDTO);

    void deleteImage(Long id);
}
