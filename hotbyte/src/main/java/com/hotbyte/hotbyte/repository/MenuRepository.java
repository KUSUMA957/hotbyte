package com.hotbyte.hotbyte.repository;

import com.hotbyte.hotbyte.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.hotbyte.hotbyte.entity.Restaurant;

public interface MenuRepository extends JpaRepository<Menu, Long> {
	List<Menu> findByRestaurant(Restaurant restaurant);
	List<Menu> findByRestaurantId(Long restaurantId);
}

