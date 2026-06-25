package com.hotbyte.hotbyte.dto;

import lombok.Data;

@Data
public class ProfileUpdateRequest {
    private String restaurantName;
    private String location;
    private String contactNumber;
    private String name;      // owner name
    private String phone;
    private String address;
}

