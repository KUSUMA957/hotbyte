package com.hotbyte.hotbyte.controller;

import com.hotbyte.hotbyte.dto.MenuRequest;
import com.hotbyte.hotbyte.dto.ProfileUpdateRequest;
import com.hotbyte.hotbyte.entity.Menu;
import com.hotbyte.hotbyte.repository.MenuRepository;
import com.hotbyte.hotbyte.service.RestaurantService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/restaurant")
@RequiredArgsConstructor
public class RestaurantController {
    private final RestaurantService restaurantService;
    private final MenuRepository menuRepository;
    @PostMapping("/menu")
    public Map<String, String> addMenu(@RequestBody MenuRequest request,Authentication authentication) {
        String email = authentication.getName();
        return restaurantService.addMenu(request, email);
    }
    @GetMapping("/menu")
    public List<Menu> getMyMenu(Authentication authentication) {
        String email = authentication.getName();
        return restaurantService.getMyMenu(email);
    }
    @PutMapping("/menu/{id}")
    public Menu updateMenu(@PathVariable("id") Long id,@RequestBody MenuRequest request) {
        return restaurantService.updateMenu(id, request);
    }
    @DeleteMapping("/menu/{id}")
    public Map<String, String> deleteMenu(@PathVariable("id") Long id) {
        menuRepository.deleteById(id);
        return Map.of("message", "Menu deleted ✅");
    }
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @RequestBody ProfileUpdateRequest request,

            Authentication authentication) {

               String email = authentication.getName(); // ✅ same as principal

        return ResponseEntity.ok(restaurantService.updateProfile(request, email));
    }
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                restaurantService.getProfile(email)
        );
    }

}