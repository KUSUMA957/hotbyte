package com.hotbyte.hotbyte.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuDto {

	private Long id;
	private String itemName;
	private Double price;
	private Long restaurantId;

}
