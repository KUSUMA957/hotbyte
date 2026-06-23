package com.hotbyte.hotbyte.service;

import java.util.List;
import java.util.Map;

import com.hotbyte.hotbyte.entity.Cart;

public interface UserService {
	Map<String, String> addToCart(Long menuId, String email);
	List<Cart> getCart(String email);
}
