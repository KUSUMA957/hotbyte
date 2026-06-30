package com.hotbyte.hotbyte.entity;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CartResponseDto {

	 private Long id;
	    private Integer quantity;

	    private MenuDto menu;

}
