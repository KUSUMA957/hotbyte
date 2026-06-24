package com.hotbyte.hotbyte.service.impl;

import com.hotbyte.hotbyte.dto.RegisterRequest;
import com.hotbyte.hotbyte.entity.Restaurant;
import com.hotbyte.hotbyte.entity.Role;
import com.hotbyte.hotbyte.entity.User;
import com.hotbyte.hotbyte.repository.RestaurantRepository;
import com.hotbyte.hotbyte.repository.UserRepository;
import com.hotbyte.hotbyte.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Map;

import com.hotbyte.hotbyte.dto.AuthResponse;
import com.hotbyte.hotbyte.dto.LoginRequest;
import com.hotbyte.hotbyte.config.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    @Override
    public Map<String, String> register(RegisterRequest request) {
        // ✅ 1. Check duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        if (request.getRole() == Role.RESTAURANT) {
            if (request.getRestaurantName() == null || request.getRestaurantName().isBlank()) {
                throw new RuntimeException("Restaurant name is required for restaurant registration");
            }
            if (request.getLocation() == null || request.getLocation().isBlank()) {
                throw new RuntimeException("Restaurant location is required for restaurant registration");
            }
        }
        // ✅ 2. Create user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))//.password(request.getPassword()) we will encrypt later
                .phone(request.getPhone())
                .address(request.getAddress())
                .gender(request.getGender())
                .role(request.getRole() != null ? request.getRole() : Role.USER)
                .createdAt(LocalDateTime.now())
                .build();
        User savedUser = userRepository.save(user);
        // ✅ 3. If role = RESTAURANT → create restaurant
        if (savedUser.getRole() == Role.RESTAURANT) {
            Restaurant restaurant = Restaurant.builder()
                    .restaurantName(request.getRestaurantName())
                    .location(request.getLocation())
                    .contactNumber(request.getPhone())
                    .user(savedUser)
                    .createdAt(LocalDateTime.now())
                    .build();
            restaurantRepository.save(restaurant);
        }
        return Map.of("message", "Registration successful");
    }
    @Override
    public Map<String, Object> login(LoginRequest request) {
        // ✅ 1. Find user
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        // ✅ 2. Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        // ✅ 3. Generate JWT
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        String restaurantName = null;

        // ✅ Only for RESTAURANT users
        if (user.getRole() == Role.RESTAURANT && user.getRestaurant() != null) {
            restaurantName = user.getRestaurant().getRestaurantName();
        }

        // ✅ 4. Return response
//        return AuthResponse.builder()
//                .token(token)
//                .role(user.getRole().name())
//                .name(user.getName())
//                .build();
        return Map.of(
                "message", "Login successful",
                "token", token,
                "role", user.getRole().name(),
                "name", user.getName(),
                "restaurantName", restaurantName != null ? restaurantName : ""
        );
    }
}
