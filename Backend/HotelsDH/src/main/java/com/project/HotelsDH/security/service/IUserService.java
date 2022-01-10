package com.project.HotelsDH.security.service;

import com.project.HotelsDH.security.dto.UserDTO;
import com.project.HotelsDH.security.model.MainUser;
import com.project.HotelsDH.security.model.User;
import java.util.Optional;

public interface IUserService {
    void createUser(User user);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    UserDTO getUserCurrent(MainUser userCurrent);

}
