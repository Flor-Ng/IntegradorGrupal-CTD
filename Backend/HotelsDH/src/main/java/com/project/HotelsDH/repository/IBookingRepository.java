package com.project.HotelsDH.repository;

import com.project.HotelsDH.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Collection;

public interface IBookingRepository extends JpaRepository<Booking, Long> {
    Collection<Booking> findAllByProductId(Long id);
    Collection<Booking> findByUserId(Long userId);
}
