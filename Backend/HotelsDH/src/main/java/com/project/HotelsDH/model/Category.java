package com.project.HotelsDH.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import java.util.Set;

/**
 * * Entidad que contiene atributos correspondientes a una categoria.
 * */

@Entity
@Getter @Setter
@Table(name="categories")
public class Category {
    @SequenceGenerator(name="categories_sequence",sequenceName="categories_sequence", allocationSize=1)
    //@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="cities_sequence")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    @Column(name="id")
    private Long id;
    @Column(name="title")
    private String title;
    @Column(name="description")
    private String description;
    @Column(name="urlImage")
    private String urlImage;

    public Category() {
    }

    public Category(String title, String description, String urlImage) {
        this.title = title;
        this.description = description;
        this.urlImage = urlImage;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", urlImage='" + urlImage + '\'' +
                '}';
    }

    @OneToMany(mappedBy = "categories")
    @JsonIgnore
    private Set<Product> products;
}
