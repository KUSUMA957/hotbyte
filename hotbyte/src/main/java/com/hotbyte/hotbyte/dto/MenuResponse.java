package com.hotbyte.hotbyte.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuResponse {

	private Long id;
	private String itemName;
	private String description;
	private Double price;
	private String category;
	private String type;
	private Double rating;
	private String servingSize;
	private String nutritionalInfo;
	private Integer calories;
	private Boolean available;
	// ✅ NEW FIELDS
	private Long restaurantId;
	private String restaurantName;
	private String location;
}