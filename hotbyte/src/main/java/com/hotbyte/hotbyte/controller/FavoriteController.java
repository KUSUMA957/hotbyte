package com.hotbyte.hotbyte.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.hotbyte.hotbyte.entity.Favorite;
import com.hotbyte.hotbyte.entity.Restaurant;
import com.hotbyte.hotbyte.entity.User;
import com.hotbyte.hotbyte.repository.RestaurantRepository;
import com.hotbyte.hotbyte.service.FavoriteService;
import com.hotbyte.hotbyte.service.UserService;

@RestController
@RequestMapping("/api/user/favorite")
public class FavoriteController {

	@Autowired
	private FavoriteService service;
	@Autowired
	private UserService userService;
	@Autowired
	private RestaurantRepository restaurantRepo;

	// ✅ ADD FAVORITE
	@PostMapping("/{restaurantId}")
	public String add(@PathVariable("restaurantId") Long restaurantId, Authentication authentication) {
		String email = authentication.getName();
		User user = userService.findByEmail(email);
		Restaurant restaurant = restaurantRepo.findById(restaurantId)
				.orElseThrow(() -> new RuntimeException("Restaurant not found"));
		service.add(user, restaurant);
		return "Added to favorites ✅";
	}

	// ✅ GET FAVORITES
	@GetMapping
	public List<Favorite> get(Authentication authentication) {
		String email = authentication.getName();
		User user = userService.findByEmail(email);
		return service.get(user);
	}

	// ✅ DELETE FAVORITE (SECURE VERSION)
	@DeleteMapping("/{id}")
	public Map<String, String> delete(@PathVariable("id") Long id, Authentication authentication) {
		String email = authentication.getName();
		User user = userService.findByEmail(email);
		service.deleteByUser(id, user); // ✅ secure delete
		return Map.of("message", "Deleted from favorites ✅");
	}
}