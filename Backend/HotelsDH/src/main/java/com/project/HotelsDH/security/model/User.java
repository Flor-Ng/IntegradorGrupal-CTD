package com.project.HotelsDH.security.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.HotelsDH.model.Booking;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.Set;


/**
 * Entidad que se comunica con la base de datos.
 * */


@Entity
@Getter
@Setter
@Table(name="users")
public class User {
    @Column(name="id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Column(name="name")
    private String name;
    @NotNull
    @Column(name="last_name")
    private String lastName;
    @NotNull
    @Column(name="email", unique = true)
    private String email;
    @NotNull
    @Column(name="password")
    private String password;
    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_role")
    private Role role;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<Booking> bookings;

    public User() {
    }

    public User(String name, String lastName, String email, String password) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public User(String name, String lastName, String email, String password, Role role, Set<Booking> bookings) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.bookings = bookings;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", bookings=" + bookings +
                '}';
    }
}
