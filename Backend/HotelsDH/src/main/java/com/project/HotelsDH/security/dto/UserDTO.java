package com.project.HotelsDH.security.dto;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

/** Clase DTO brinda los datos de un usuario logueado*/

@Data /** incluye getters y setters */
@AllArgsConstructor /** genera constructor */
public class UserDTO {
        private Long id;
        private String name;
        private String lastName;
        private String email;
        private Collection<? extends GrantedAuthority> authority;
}
