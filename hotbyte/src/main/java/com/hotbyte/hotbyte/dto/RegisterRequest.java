package com.hotbyte.hotbyte.dto;

import com.hotbyte.hotbyte.entity.Role;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be in valid format")
    private String email;
    @NotBlank(message = "Password is required")
    @Size(min = 5, message = "Password must be at least 5 characters")
    private String password;
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be exactly 10 digits")
    private String phone;
    private String address;
    private String gender;
    // ✅ Restaurant-specific fields
    private String restaurantName;
    private String location;
    private Role role; // USER or RESTAURANT
}