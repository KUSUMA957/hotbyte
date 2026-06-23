package com.hotbyte.hotbyte.service.impl;

import com.hotbyte.hotbyte.dto.MenuRequest;
import com.hotbyte.hotbyte.entity.Menu;
import com.hotbyte.hotbyte.entity.Restaurant;
import com.hotbyte.hotbyte.entity.User;
import com.hotbyte.hotbyte.repository.MenuRepository;
import com.hotbyte.hotbyte.repository.RestaurantRepository;
import com.hotbyte.hotbyte.repository.UserRepository;
import com.hotbyte.hotbyte.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {
    private final MenuRepository menuRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    public Map<String, String> addMenu(MenuRequest request, String email) {
        // ✅ Get logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        // ✅ Get restaurant
        Restaurant restaurant = restaurantRepository.findByUser(user);
        if (restaurant == null) {
            throw new RuntimeException("Restaurant not found for user");
        }
        
        // ✅ Create menu
        Menu menu = Menu.builder()
                .itemName(request.getItemName())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(request.getCategory())
                .type(request.getType())
                .nutritionalInfo(request.getNutritionalInfo())
                .calories(request.getCalories())
                .available(true)
                .restaurant(restaurant)
                .createdAt(LocalDateTime.now())
                .build();
        menuRepository.save(menu);
        return Map.of("message", "Menu added successfully");
    }
    @Override
    public List<Menu> getMyMenu(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Restaurant restaurant = restaurantRepository.findByUser(user);

        return menuRepository.findByRestaurant(restaurant);
    }
    // ✅ For user (public menu)
    @Override
    public List<Menu> getAllMenu() {
        return menuRepository.findAll();
    }
    @Override
    public Menu updateMenu(Long id, MenuRequest request) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow();

        menu.setItemName(request.getItemName());
        menu.setDescription(request.getDescription());
        menu.setPrice(request.getPrice());
        menu.setCategory(request.getCategory());
        menu.setRating(request.getRating());
        menu.setServingSize(request.getServingSize());
        menu.setNutritionalInfo(request.getNutritionalInfo());
        menu.setAvailable(request.getAvailable());
        return menuRepository.save(menu);
    }

@Override
    public Map<String, String> deleteMenu(Long id) {
        menuRepository.deleteById(id);
        return Map.of("message", "Deleted ✅");
    }

}