package com.hotbyte.hotbyte.service;

import java.util.List;
import java.util.Map;

import com.hotbyte.hotbyte.entity.Cart;
import com.hotbyte.hotbyte.entity.User;

public interface UserService {
	Map<String, String> addToCart(Long menuId, String email);
	List<Cart> getCart(String email);
	User findByEmail(String name);
	
}
