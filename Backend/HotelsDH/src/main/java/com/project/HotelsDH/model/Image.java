package com.project.HotelsDH.model;
import lombok.*;
import javax.persistence.*;

/**
 * * Entidad que contiene atributos correspondientes a una imagen.
 * */

@Entity
@Getter @Setter
@Table(name="images")
public class Image {
    @SequenceGenerator(name="images_sequence",sequenceName="images_sequence", allocationSize=1)
    //@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="images_sequence")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    @Column(name="id")
    private Long id;
    @Column(name="title")
    private String title;
    @Column(name="url")
    private String url;

    public Image() {
    }

    public Image(String title, String url) {
        this.title = title;
        this.url = url;
    }

    @Override
    public String toString() {
        return "Image{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", url='" + url + '\'' +
                '}';
    }

    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;

}
