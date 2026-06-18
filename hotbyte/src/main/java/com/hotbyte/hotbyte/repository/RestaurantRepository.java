package com.hotbyte.hotbyte.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotbyte.hotbyte.entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
	
}