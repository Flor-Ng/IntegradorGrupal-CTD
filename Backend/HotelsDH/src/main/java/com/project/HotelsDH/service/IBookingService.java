package com.project.HotelsDH.service;
import com.project.HotelsDH.model.dto.BookingDTO;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

public interface IBookingService {

    void createBooking(BookingDTO bookingDTO);

    Collection<BookingDTO> getAll();

    BookingDTO readBooking(Long id);

    Collection<BookingDTO> findAllByProductId(Long id);

    void updateBooking(BookingDTO bookingDTO);

    void deleteBooking(Long id);

    Collection<BookingDTO> findByUserId(Long id);

    Collection<String> getAllDatesOfBookings(Long id);
    void datesBetweenTwoDate(LocalDate startDate, LocalDate endDate, List<LocalDate> totalDates);

    public Collection<BookingDTO> findByDate(LocalDate wantedDateIn, LocalDate wantedDateOut);

}
