package com.hotbyte.hotbyte.entity;

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
