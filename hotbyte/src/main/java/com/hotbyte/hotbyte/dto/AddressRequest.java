package com.hotbyte.hotbyte.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressRequest {

	@NotBlank
	private String label;

	@NotBlank
	private String addressLine;

	@NotBlank
	private String city;

	@NotBlank
	private String pincode;
}