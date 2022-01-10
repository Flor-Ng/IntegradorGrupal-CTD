package com.project.HotelsDH.security.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import java.util.Collection;

@Getter @Setter
public class JwtDTO {
    private String token;
    private String bearer = "Bearer";
    public String email;
    private Collection< ? extends GrantedAuthority> authority;

    public JwtDTO(String token, String email, Collection<? extends GrantedAuthority> authority) {
        this.token = token;
        this.email = email;
        this.authority = authority;
    }
}
