package com.hotbyte.hotbyte.controller;

import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotbyte.hotbyte.entity.Order;
import com.hotbyte.hotbyte.entity.User;
import com.hotbyte.hotbyte.repository.OrderRepository;
import com.hotbyte.hotbyte.service.OrderService;
import com.hotbyte.hotbyte.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user/orders")
@RequiredArgsConstructor
public class OrderController {

	private final OrderService service;
	private final UserService userService;
	private final OrderRepository orderRepository;

	// ✅ PLACE ORDER
	@PostMapping("/place")
	public Order placeOrder(Authentication authentication) {
		String email = authentication.getName();
		User user = userService.findByEmail(email);
		return service.placeOrder(user);
	}

	// ✅ ORDER HISTORY
	@GetMapping
	public List<Order> getOrders(Authentication authentication) {
		String email = authentication.getName();
		User user = userService.findByEmail(email);
		return orderRepository.findByUserId(user.getId());
	}
}
