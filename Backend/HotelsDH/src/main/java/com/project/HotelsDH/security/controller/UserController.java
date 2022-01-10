package com.project.HotelsDH.security.controller;

import com.project.HotelsDH.security.dto.UserDTO;
import com.project.HotelsDH.security.model.MainUser;
import com.project.HotelsDH.security.model.UserCurrent;
import com.project.HotelsDH.security.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
    @Autowired
    private IUserService iUserService;

    @GetMapping("/me")
//    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserDTO> getUserCurrent(@UserCurrent MainUser UserCurrent) {
        UserDTO userData = iUserService.getUserCurrent(UserCurrent);
        return new ResponseEntity<>(userData, HttpStatus.OK);
    }
}
