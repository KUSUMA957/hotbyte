package com.hotbyte.hotbyte.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotbyte.hotbyte.entity.Favorite;
import com.hotbyte.hotbyte.entity.Restaurant;
import com.hotbyte.hotbyte.entity.User;
import com.hotbyte.hotbyte.repository.FavoriteRepository;

@Service
public class FavoriteService {

	@Autowired
	private FavoriteRepository repo;

	public Favorite add(User user, Restaurant restaurant) {
		Favorite f = new Favorite();
		f.setUser(user);
		f.setRestaurant(restaurant);
		return repo.save(f);
	}

	public List<Favorite> get(User user) {
		return repo.findByUserId(user.getId());
	}

	public void deleteByUser(Long id, User user) {
		// ✅ Fetch favorite by ID
		Favorite favorite = repo.findById(id).orElseThrow(() -> new RuntimeException("Favorite not found"));
		// ✅ Check ownership (VERY IMPORTANT SECURITY)
		if (!favorite.getUser().getId().equals(user.getId())) {
			throw new RuntimeException("Unauthorized: Cannot delete this favorite ❌");
		}
		// ✅ Delete only if it belongs to user
		repo.delete(favorite);
	}
}
