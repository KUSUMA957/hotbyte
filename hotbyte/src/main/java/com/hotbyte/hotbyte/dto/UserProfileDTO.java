package com.hotbyte.hotbyte.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileDTO {

    private String name;
    private String email;
    private String phone;
    private String address;   // ✅ include your existing field
}
