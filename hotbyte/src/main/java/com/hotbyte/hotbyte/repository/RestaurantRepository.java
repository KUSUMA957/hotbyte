package com.hotbyte.hotbyte.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotbyte.hotbyte.entity.Menu;
import com.hotbyte.hotbyte.entity.Restaurant;
import com.hotbyte.hotbyte.entity.User;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
	Restaurant findByUser(User user);
	//List<Menu> findByRestaurant(Restaurant restaurant);
	
}