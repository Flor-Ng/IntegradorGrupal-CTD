package com.project.HotelsDH.model.dto;
import com.project.HotelsDH.model.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter @Setter
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private Category categories;
    private City city;
    private Double latitude;
    private Double longitude;
    private Set<ImageDTO> images;
//    private Set<Booking> bookings;
    private Set<Feature> features;
    private String houseRules;
    private String healthAndSecurity;
    private String cancellationPolicy;
}


