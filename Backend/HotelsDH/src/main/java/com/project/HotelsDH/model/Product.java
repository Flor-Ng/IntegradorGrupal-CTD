package com.project.HotelsDH.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import java.util.List;
import java.util.Set;

/**
 * * Entidad que contiene atributos correspondientes a un producto.
 * */

@Entity
@Getter @Setter
@Table(name="products")
public class Product {
    @SequenceGenerator(name="products_sequence",sequenceName="products_sequence", allocationSize=1)
    //@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="products_sequence")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    @Column(name="id")
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="description", columnDefinition = "TEXT")
    private String description;

    @Column(name="latitude")
    private Double latitude;

    @Column(name="longitude")
    private Double longitude;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "id_product")
    @JsonIgnore
    private Set<Image> images;

    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category categories;

    @ManyToOne
    @JoinColumn(name = "id_city")
    private City city;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<Booking> bookings;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "productFeature",
            joinColumns = @JoinColumn(name = "id_product"),
            inverseJoinColumns = @JoinColumn(name = "id_feature")
    )
    private Set<Feature> features;

    @Column(name="houseRules", columnDefinition = "TEXT")
    private String houseRules;
    @Column(name="healthAndSecurity", columnDefinition = "TEXT")
    private String healthAndSecurity;
    @Column(name="cancellationPolicy", columnDefinition = "TEXT")
    private String cancellationPolicy;


    public Product() {
    }

    public Product(String name, String description, Double latitude, Double longitude, Set<Image> images, Category categories, City city, Set<Booking> bookings, Set<Feature> features, String houseRules, String healthAndSecurity, String cancellationPolicy) {
        this.name = name;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.images = images;
        this.categories = categories;
        this.city = city;
        this.bookings = bookings;
        this.features = features;
        this.houseRules = houseRules;
        this.healthAndSecurity = healthAndSecurity;
        this.cancellationPolicy = cancellationPolicy;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", images=" + images +
                ", categories=" + categories +
                ", city=" + city +
                ", bookings=" + bookings +
                ", features=" + features +
                ", houseRules='" + houseRules + '\'' +
                ", healthAndSecurity='" + healthAndSecurity + '\'' +
                ", cancellationPolicy='" + cancellationPolicy + '\'' +
                '}';
    }
}
