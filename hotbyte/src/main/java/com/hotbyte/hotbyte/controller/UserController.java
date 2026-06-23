package com.hotbyte.hotbyte.controller;

import java.util.List;
import org.springframework.security.core.Authentication;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

import com.hotbyte.hotbyte.entity.Cart;
import com.hotbyte.hotbyte.entity.Menu;
import com.hotbyte.hotbyte.repository.CartRepository;
import com.hotbyte.hotbyte.service.RestaurantService;
import com.hotbyte.hotbyte.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
	 private final RestaurantService restaurantService;
	 private final UserService userService;
	 private final CartRepository cartRepository;
	 @GetMapping("/menu")
	 public List<Menu> getAllMenu() {
	   return restaurantService.getAllMenu();
	 }
	@GetMapping("/test")
	public Map<String, String> test() {
	    return Map.of("message", "User API accessed");
	}
	@PostMapping("/cart/{menuId}")
	public Map<String, String> addToCart(@PathVariable("menuId") Long menuId,Authentication authentication) {
	    String email = authentication.getName();
	    return userService.addToCart(menuId, email);
	}
	@GetMapping("/cart")
	public List<Cart> getCart(Authentication authentication) {
	    String email = authentication.getName();
	    return userService.getCart(email);
	}
	@DeleteMapping("/cart/{cartId}")
	public Map<String, String> removeCartItem(@PathVariable("cartId") Long cartId) {
	    cartRepository.deleteById(cartId);
	    return Map.of("message", "Item removed ✅");
	}
	@PutMapping("/cart/{cartId}")
	public Cart updateQuantity(@PathVariable("cartId") Long cartId,
	                           @RequestParam("quantity") int quantity) {

	    Cart cart = cartRepository.findById(cartId).orElseThrow();
	    cart.setQuantity(quantity);
	    return cartRepository.save(cart);
	}
}
