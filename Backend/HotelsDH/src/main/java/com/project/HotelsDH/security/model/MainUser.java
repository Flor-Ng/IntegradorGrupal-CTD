package com.project.HotelsDH.security.model;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

/**
 * Clase que gestiona la seguridad y los permisos de cada usuario.
 * */
public class MainUser implements UserDetails {
        private Long id;
        private String name;
        private String lastName;
        private String email;
        private String password;
        private GrantedAuthority authorities;

    public MainUser(Long id, String name, String lastName, String email, String password, GrantedAuthority authorities) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    /** Metodo que asigna los permisos a cada usuario.
     * recibe un usuario de la bd por parametro
     * */
    public static MainUser build(User user){
        Role role = user.getRole();
        GrantedAuthority authority =
                new SimpleGrantedAuthority(role.getName().name());
        return new MainUser(user.getId(), user.getName(), user.getLastName(), user.getEmail(), user.getPassword(), authority);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(authorities);
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getLastName() {
        return lastName;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
