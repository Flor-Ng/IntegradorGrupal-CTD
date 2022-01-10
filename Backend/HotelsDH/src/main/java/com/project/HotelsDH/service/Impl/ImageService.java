package com.project.HotelsDH.service.Impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.HotelsDH.model.Image;
import com.project.HotelsDH.model.dto.ImageDTO;
import com.project.HotelsDH.repository.IImageRepository;
import com.project.HotelsDH.service.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ImageService implements IImageService {
  
    @Autowired
    IImageRepository imageRepository;

    @Autowired
    ObjectMapper mapper;

    public void createImage(ImageDTO imageDTO){

        Image image= mapper.convertValue(imageDTO, Image.class);
        imageRepository.save(image);
    }

    public ImageDTO readImage(Long id){

        ImageDTO imageDTO = null;
        Optional<Image> image = imageRepository.findById(id);
        if(image.isPresent()){
            imageDTO = mapper.convertValue(image, ImageDTO.class);
        }
        return imageDTO;
    }

    public void updateImage(ImageDTO imageDTO){
        Image image = mapper.convertValue(imageDTO, Image.class);
        imageRepository.save(image);
    }

    public void deleteImage(Long id){

        imageRepository.deleteById(id);
    }

    public Collection<ImageDTO> getAll(){

        List<Image> categories = imageRepository.findAll();

        Set<ImageDTO> imageDTOS = new HashSet<>();
        for (Image image : categories){
            imageDTOS.add(mapper.convertValue(image,ImageDTO.class));
        }
        return imageDTOS;
    }
}

