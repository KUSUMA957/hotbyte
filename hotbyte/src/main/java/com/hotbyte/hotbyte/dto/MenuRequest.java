package com.hotbyte.hotbyte.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data

@NoArgsConstructor   // ✅ CRITICAL FIX
@AllArgsConstructor  // ✅ recommended
@Builder
public class MenuRequest {
    @NotBlank
    private String itemName;
    private String description;
    @NotNull
    private Double price;
    private String category;
    private String type;
    //private String tasteInfo;
    private Integer calories;
    private Boolean available;
	private Double rating;
    private String servingSize;
    private String nutritionalInfo;
    
}
