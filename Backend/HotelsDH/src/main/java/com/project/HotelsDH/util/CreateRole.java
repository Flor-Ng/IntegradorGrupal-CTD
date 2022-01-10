//package com.project.HotelsDH.util;
//
//import com.project.HotelsDH.security.enums.RoleName;
//import com.project.HotelsDH.security.model.Role;
//import com.project.HotelsDH.security.service.IRoleService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
///**
//// * Esta clase carga los roles a la base de datos, se debe ejecutar una sola vez.
//// * */
//
//@Component
//public class CreateRole implements CommandLineRunner {
//    @Autowired
//    IRoleService iRoleService;
//    @Override
//    public void run(String... args) throws Exception {
//        Role adminRole = new Role(RoleName.ROLE_ADMIN);
//        Role userRole = new Role(RoleName.ROLE_USER);
//        iRoleService.createRole(adminRole);
//        iRoleService.createRole(userRole);
//    }
//}