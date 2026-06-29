package com.hotbyte.hotbyte.service;

import com.hotbyte.hotbyte.dto.MenuRequest;
import com.hotbyte.hotbyte.dto.ProfileResponse;
import com.hotbyte.hotbyte.dto.ProfileUpdateRequest;
import com.hotbyte.hotbyte.entity.Menu;
import com.hotbyte.hotbyte.entity.MenuResponse;

import java.util.List;
import java.util.Map;

public interface RestaurantService {
	public Map<String, String> addMenu(MenuRequest request, String email);
	public List<Menu> getMyMenu(String email);
	public List<MenuResponse> getAllMenu();
	public Menu updateMenu(Long id, MenuRequest request);
	public Map<String, String> deleteMenu(Long id);
	public Map<String, String> updateProfile(ProfileUpdateRequest request, String email);
	public ProfileResponse getProfile(String email);
}


