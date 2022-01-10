package com.project.HotelsDH.service.Impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.HotelsDH.model.Booking;
import com.project.HotelsDH.model.dto.BookingDTO;
import com.project.HotelsDH.repository.IBookingRepository;
import com.project.HotelsDH.service.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.*;

@Service
public class BookingService implements IBookingService {

    @Autowired
    IBookingRepository bookingRepository;

    @Autowired
    ObjectMapper mapper;

    public void createBooking(BookingDTO bookingDTO){

        Booking booking= mapper.convertValue(bookingDTO, Booking.class);
        bookingRepository.save(booking);
    }

    public BookingDTO readBooking(Long id){

        BookingDTO bookingDTO = null;
        Optional<Booking> booking = bookingRepository.findById(id);
        if(booking.isPresent()){
            bookingDTO = mapper.convertValue(booking, BookingDTO.class);
        }
        return bookingDTO;
    }

    /**
     * Metodo que permite consultar reservas por id de producto.
     * */
    public Collection<BookingDTO> findAllByProductId(Long id) {
        Collection<Booking> bookings = bookingRepository.findAllByProductId(id);
        Set<BookingDTO> bookingDTOS = new HashSet<>();
        for (Booking booking : bookings){
            bookingDTOS.add(mapper.convertValue(booking,BookingDTO.class));
        }
        return bookingDTOS;
    }

    public void updateBooking(BookingDTO bookingDTO){
        Booking booking = mapper.convertValue(bookingDTO, Booking.class);
        bookingRepository.save(booking);
    }

    public void deleteBooking(Long id){

        bookingRepository.deleteById(id);
    }

    public Collection<BookingDTO> getAll(){

        List<Booking> bookings = bookingRepository.findAll();

        Set<BookingDTO> bookingDTOS = new HashSet<>();
        for (Booking booking : bookings){
            bookingDTOS.add(mapper.convertValue(booking,BookingDTO.class));
        }
        return bookingDTOS;
    }

    public Collection<BookingDTO> findByDate(LocalDate wantedDateIn, LocalDate wantedDateOut) {

        Collection<Booking> allBookings = bookingRepository.findAll();

        Set<BookingDTO> bookingNotAvailable = new HashSet<>();
        for (Booking booking : allBookings) {
            if (booking.getStartDate().isBefore(wantedDateOut) && booking.getEndDate().isAfter(wantedDateIn)) {
                bookingNotAvailable.add(mapper.convertValue(booking, BookingDTO.class));
            }
        }
        return bookingNotAvailable;
    }
    public Collection<BookingDTO> findByUserId(Long id){
        Collection<Booking> bookings = bookingRepository.findByUserId(id);
        Set<BookingDTO> bookingDTOS = new HashSet<>();
        for (Booking booking : bookings){
            bookingDTOS.add(mapper.convertValue(booking,BookingDTO.class));
        }
        return bookingDTOS;
    }

    /**
     * Metodo para obtener un array con las fechas no disponibles de cada producto
     * */
    @Override
    public Collection<String> getAllDatesOfBookings(Long id) {
        Collection<Booking> bookings = bookingRepository.findAllByProductId(id);
        ArrayList<String> bookingDTOS = new ArrayList<>();
        List<LocalDate> datas = new ArrayList<>();
        for (Booking booking : bookings){
            datesBetweenTwoDate(booking.getStartDate(), booking.getEndDate(), datas);
        }
        Collections.sort(datas);
        for (LocalDate data : datas) {
            String month1 = data.getMonth().getDisplayName(TextStyle.FULL_STANDALONE, Locale.ENGLISH);
            String startDate = month1.substring(0,3) + " "  + data.getDayOfMonth() + ", " + data.getYear();
            bookingDTOS.add(startDate);
        }
        return bookingDTOS;
    }

    @Override
    public void datesBetweenTwoDate(LocalDate startDate, LocalDate endDate, List<LocalDate> totalDates) {
        if (!startDate.plusDays(1).isAfter(endDate)) {
            datesBetweenTwoDate(startDate.plusDays(1), endDate, totalDates);
        }
        totalDates.add(startDate);
    }


}
