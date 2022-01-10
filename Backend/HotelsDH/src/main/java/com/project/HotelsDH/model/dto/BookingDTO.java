package com.project.HotelsDH.model.dto;
import com.project.HotelsDH.model.Product;
import com.project.HotelsDH.security.model.User;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter @Setter
public class BookingDTO {
    private Long id;

    private LocalTime startTime;

    private LocalDate startDate;

    private LocalDate endDate;

    private Product product;

    private User user;

//    private String messageToSeller;
//    private Boolean vaccinatedCov;

}
