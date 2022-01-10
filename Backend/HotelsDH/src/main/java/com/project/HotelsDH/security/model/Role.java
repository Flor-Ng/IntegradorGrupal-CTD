package com.project.HotelsDH.security.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.HotelsDH.security.enums.RoleName;
import com.sun.istack.NotNull;
import lombok.*;
import javax.persistence.*;
import java.util.List;

/** Entidad que genera la tabla roles en la base de datos*/

@Entity
@Getter
@Setter
@Table(name="roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name")
    @NotNull
    @Enumerated(EnumType.STRING)
    private RoleName name;

    @OneToMany(mappedBy = "role")
    @JsonIgnore
    private List<User> user;

    public Role() {
    }

    public Role(RoleName name, List<User> user) {
        this.name = name;
        this.user = user;
    }

    public Role(RoleName name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", user=" + user +
                '}';
    }
}
