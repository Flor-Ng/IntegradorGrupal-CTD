package com.project.HotelsDH.security.repository;

import com.project.HotelsDH.security.enums.RoleName;
import com.project.HotelsDH.security.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IRoleRepository extends JpaRepository <Role, Long> {
    Optional<Role> findByName(RoleName rolName);
}
