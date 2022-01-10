package com.project.HotelsDH.model;
import com.project.HotelsDH.security.model.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * * Entidad que contiene atributos correspondientes a una reserva.
 * */

@Entity
@Getter @Setter
@Table(name="bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="start_time", nullable = false) /** insert format "HH:mm:ss" */
    private LocalTime startTime;

    @Column(name="start_date", nullable = false) /** insert format "YYYY-mm-dd" */
    private LocalDate startDate;

    @Column(name="end_date", nullable = false) /** insert format "YYYY-mm-dd"  */
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

//    @Column(name="messageToSeller", columnDefinition = "TEXT")
//    private String messageToSeller;
//
//    @Column(name="vaccinated_CoV")
//    private Boolean vaccinatedCov;

    public Booking() {
    }

    public Booking(LocalTime startTime, LocalDate startDate, LocalDate endDate, Product product, User user) {
        this.startTime = startTime;
        this.startDate = startDate;
        this.endDate = endDate;
        this.product = product;
        this.user = user;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", startTime=" + startTime +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", product=" + product +
                ", user=" + user +
                '}';
    }

}
