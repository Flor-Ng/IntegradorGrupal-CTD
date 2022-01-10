package com.project.HotelsDH.security.service;

import com.project.HotelsDH.security.enums.RoleName;
import com.project.HotelsDH.security.model.Role;

import java.util.Optional;

public interface IRoleService {
    void createRole(Role role);
    Optional<Role> findByName(RoleName rolName);
}
