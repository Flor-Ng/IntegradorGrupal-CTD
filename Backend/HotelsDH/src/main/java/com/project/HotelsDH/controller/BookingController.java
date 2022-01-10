package com.project.HotelsDH.controller;

import com.project.HotelsDH.model.dto.BookingDTO;
import com.project.HotelsDH.security.dto.UserDTO;
import com.project.HotelsDH.security.model.MainUser;
import com.project.HotelsDH.security.model.UserCurrent;
import com.project.HotelsDH.security.service.IUserService;
import com.project.HotelsDH.service.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collection;

/**
 * Controller que permite crear una nueva reserva & consultar reservas por id de producto.
 * */

@RestController
@RequestMapping("/bookings")
@CrossOrigin
public class BookingController {
    private final IBookingService bookingService;
    private final IUserService iUserService;

    @Autowired
    public BookingController(IBookingService bookingService, IUserService iUserService) {
        this.bookingService = bookingService;
        this.iUserService = iUserService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createBooking(@RequestBody BookingDTO booking) {
        if (booking.getEndDate().isBefore(booking.getStartDate())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid date, endDate must be after startDate");
        }
        if (booking.getStartDate().isBefore(LocalDate.now())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The startDate must be after the current date");
        }
        Collection<BookingDTO> bookingsNotAvailable = bookingService.findByDate(booking.getStartDate(), booking.getEndDate());
        for (BookingDTO bookingDTO: bookingsNotAvailable) {
            if (bookingDTO.getProduct().getId() == booking.getProduct().getId()){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Product Not Available");
            }
        }
        bookingService.createBooking(booking);
        return ResponseEntity.status(HttpStatus.CREATED).body("Booking created successfully");
    }

    @PreAuthorize("hasRole('ADMIN')") /** solo el administrador puede buscar reservas por id del producto*/
    @GetMapping("/{id}")
    public Collection<BookingDTO> getBookingById(@PathVariable long id){
        return bookingService.findAllByProductId(id);
    }

    @GetMapping("/@me")
    public ResponseEntity<?> getBookingByUserId(@UserCurrent MainUser UserCurrent){
        UserDTO userData = iUserService.getUserCurrent(UserCurrent);
        Collection<BookingDTO> myBookings = bookingService.findByUserId(userData.getId());
        if(myBookings.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body("you have no reservations.");
        }
        return ResponseEntity.ok(myBookings);
    }

    @GetMapping("/product/{id}/dates")
    public Collection<String> getDates(@PathVariable long id){
        return bookingService.getAllDatesOfBookings(id);
    }

}
