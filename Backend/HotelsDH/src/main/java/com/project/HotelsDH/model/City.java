package com.project.HotelsDH.model;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.util.Set;

/**
 * * Entidad que contiene atributos correspondientes a una ciudad.
 * */

@Entity
@Getter @Setter
@Table(name="cities")
public class City {
    @SequenceGenerator(name="cities_sequence",sequenceName="cities_sequence", allocationSize=1)
    //@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="cities_sequence")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    @Column(name="id")
    private Long id;
    @Column(name="name")
    private String name;
    @Column(name="country")
    private String country;

    public City() {
    }

    public City(String name, String country) {
        this.name = name;
        this.country = country;
    }

    @Override
    public String toString() {
        return "City{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", country='" + country + '\'' +
                '}';
    }

    @OneToMany(mappedBy = "city")
    @JsonIgnore
    private Set<Product> product;
}
