package com.project.HotelsDH.security.controller;

import com.project.HotelsDH.security.dto.JwtDTO;
import com.project.HotelsDH.security.dto.LoginUserDTO;
import com.project.HotelsDH.security.dto.RegisterUserDTO;
import com.project.HotelsDH.security.enums.RoleName;
import com.project.HotelsDH.security.jwt.JwtProvider;
import com.project.HotelsDH.security.model.Role;
import com.project.HotelsDH.security.model.User;
import com.project.HotelsDH.security.service.IRoleService;
import com.project.HotelsDH.security.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    IUserService iUserService;
    @Autowired
    IRoleService iRoleService;
    @Autowired
    JwtProvider jwtProvider;

    @PostMapping(path = "/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterUserDTO registerUserDTO){
        if(iUserService.existsByEmail(registerUserDTO.getEmail())){
            return ResponseEntity.ok("Email already exists");
        }
        User user = new User(registerUserDTO.getName(), registerUserDTO.getLastName(), registerUserDTO.getEmail(), passwordEncoder.encode(registerUserDTO.getPassword()));
        Role role = new Role();
        role = iRoleService.findByName(RoleName.ROLE_USER).get();
        if(registerUserDTO.getRole().equals("ADMIN"))
            role = iRoleService.findByName(RoleName.ROLE_ADMIN).get();
        user.setRole(role);
        iUserService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
    }

    @PostMapping(path = "/login")
    public ResponseEntity<JwtDTO> loginUser(@RequestBody LoginUserDTO loginUserDTO){
        Authentication authentication = authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(loginUserDTO.getEmail(),
                loginUserDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        JwtDTO jwtDTO = new JwtDTO(jwt, userDetails.getUsername(), userDetails.getAuthorities());
        return new ResponseEntity(jwtDTO, HttpStatus.OK);
    }

}
