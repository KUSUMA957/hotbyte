package com.hotbyte.hotbyte.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "menu")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Menu {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String itemName;
	private String description;
	private Double price;
	private String category; // burger, pizza, etc
	private String type; // veg / nonveg
	private Double rating;
	private String servingSize;
	private String nutritionalInfo;
	private Integer calories;
	private Boolean available;
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "restaurant_id")
	private Restaurant restaurant;
	private LocalDateTime createdAt;
}