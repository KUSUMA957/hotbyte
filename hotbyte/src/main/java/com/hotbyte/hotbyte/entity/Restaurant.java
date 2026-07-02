package com.hotbyte.hotbyte.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "restaurants")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Restaurant {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String restaurantName;
	private String location;
	private String contactNumber;
	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;
	private LocalDateTime createdAt;
}