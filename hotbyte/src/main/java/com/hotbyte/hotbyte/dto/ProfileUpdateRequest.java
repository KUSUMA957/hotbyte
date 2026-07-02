package com.hotbyte.hotbyte.dto;

import lombok.Data;

@Data
public class ProfileUpdateRequest {

	private String restaurantName;
	private String location; // restaurant address
	private String name;
	private String phone; // one phone only
	private String address;
	private String gender;
}
