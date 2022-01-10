package com.project.HotelsDH.security.dto;
import lombok.*;
import javax.validation.constraints.*;

@Getter @Setter
public class RegisterUserDTO {
    @NotEmpty(message = "name must not be empty.")
    private String name;
    @NotEmpty(message = "lastname must not be empty.")
    private String lastName;
    @NotEmpty(message = "email must not be empty.")
    @Email(message = "email must be in the correct format.")
    private String email;
    @Size(min = 6, message = "password should have at least 6 characters.")
    private String password;

    private String role;

}
