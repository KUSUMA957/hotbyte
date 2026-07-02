package com.hotbyte.hotbyte.dto;

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
