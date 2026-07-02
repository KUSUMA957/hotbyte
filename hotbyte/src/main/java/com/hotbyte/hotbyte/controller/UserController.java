package com.hotbyte.hotbyte.controller;

import java.util.List;
import org.springframework.security.core.Authentication;
import java.util.Map;
import org.springframework.web.bind.annotation.*;
import com.hotbyte.hotbyte.dto.CartResponseDto;
import com.hotbyte.hotbyte.dto.MenuResponse;
import com.hotbyte.hotbyte.dto.UserProfileDTO;
import com.hotbyte.hotbyte.entity.Address;
import com.hotbyte.hotbyte.entity.Cart;
import com.hotbyte.hotbyte.entity.User;
import com.hotbyte.hotbyte.repository.CartRepository;
import com.hotbyte.hotbyte.service.AddressService;
import com.hotbyte.hotbyte.service.RestaurantService;
import com.hotbyte.hotbyte.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
	private final RestaurantService restaurantService;
	private final UserService userService;
	private final AddressService addressService;
	private final CartRepository cartRepository;

	@GetMapping("/menu")
	public List<MenuResponse> getAllMenu() {
		return restaurantService.getAllMenu();
	}

	@PostMapping("/cart/{menuId}")
	public Map<String, String> addToCart(@PathVariable("menuId") Long menuId, Authentication authentication) {
		String email = authentication.getName();
		return userService.addToCart(menuId, email);
	}

	@GetMapping("/cart")
	public List<CartResponseDto> getCart(Authentication authentication) {
		String email = authentication.getName();
		return userService.getCart(email);
	}

	@DeleteMapping("/cart/{cartId}")
	public Map<String, String> removeCartItem(@PathVariable("cartId") Long cartId) {
		cartRepository.deleteById(cartId);
		return Map.of("message", "Item removed ✅");
	}

	@PutMapping("/cart/{cartId}")
	public Cart updateQuantity(@PathVariable("cartId") Long cartId, @RequestParam("quantity") int quantity) {
		Cart cart = cartRepository.findById(cartId).orElseThrow();
		cart.setQuantity(quantity);
		return cartRepository.save(cart);
	}

	@GetMapping("/profile")
	public UserProfileDTO getProfile(Authentication authentication) {
		String email = authentication.getName();
		User user = userService.findByEmail(email);
		Address selected = addressService.getSelectedAddress(user);
		UserProfileDTO dto = new UserProfileDTO();
		dto.setName(user.getName());
		dto.setEmail(user.getEmail());
		dto.setPhone(user.getPhone());
		if (selected != null) {
			dto.setAddress(selected.getAddressLine() + ", " + selected.getCity());
		}
		return dto;
	}

}
