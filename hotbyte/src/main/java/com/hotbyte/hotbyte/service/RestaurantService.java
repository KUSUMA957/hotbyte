package com.hotbyte.hotbyte.service;

import com.hotbyte.hotbyte.dto.MenuRequest;
import com.hotbyte.hotbyte.entity.Menu;

import java.util.List;
import java.util.Map;

public interface RestaurantService {
	public Map<String, String> addMenu(MenuRequest request, String email);
	public List<Menu> getMyMenu(String email);
	public List<Menu> getAllMenu();
	public Menu updateMenu(Long id, MenuRequest request);
	public Map<String, String> deleteMenu(Long id);
}


