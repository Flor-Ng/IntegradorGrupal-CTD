package com.project.HotelsDH.security.service.Impl;

import com.project.HotelsDH.security.enums.RoleName;
import com.project.HotelsDH.security.model.Role;
import com.project.HotelsDH.security.repository.IRoleRepository;
import com.project.HotelsDH.security.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class RoleService implements IRoleService{

    @Autowired
    IRoleRepository roleRepository;

    public void createRole(Role role){
        roleRepository.save(role);
    }

    @Override
    public Optional<Role> findByName(RoleName rolName) {
        return roleRepository.findByName(rolName);
    }
}
