package com.project.HotelsDH.security.service.Impl;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.HotelsDH.security.dto.UserDTO;
import com.project.HotelsDH.security.model.MainUser;
import com.project.HotelsDH.security.model.User;
import com.project.HotelsDH.security.repository.IUserRepository;
import com.project.HotelsDH.security.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class UserService implements IUserService {

    @Autowired
    IUserRepository userRepository;

    @Autowired
    ObjectMapper mapper;

    public void createUser(User user){
        userRepository.save(user);
    }


    public void deleteUser(Long id){

        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public UserDTO getUserCurrent(MainUser userCurrent) {
        return new UserDTO(userCurrent.getId(), userCurrent.getName(),
                userCurrent.getLastName(), userCurrent.getEmail(), userCurrent.getAuthorities());
    }


}
