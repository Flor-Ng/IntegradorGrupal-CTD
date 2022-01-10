package com.project.HotelsDH.model;
import lombok.*;
import javax.persistence.*;

/**
 * * Entidad que contiene atributos correspondientes a caracteristicas.
 * */

@Entity
@Getter @Setter
@Table(name="features")
public class Feature {
    @SequenceGenerator(name="features_sequence",sequenceName="features_sequence", allocationSize=1)
    //@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="features_sequence")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    @Column(name="id")
    private Long id;
    @Column(name="name")
    private String name;
    @Column(name="icon")
    private String icon;

    public Feature() {
    }

    public Feature(String name, String icon) {
        this.name = name;
        this.icon = icon;
    }

    @Override
    public String toString() {
        return "Feature{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", icon='" + icon + '\'' +
                '}';
    }
}
