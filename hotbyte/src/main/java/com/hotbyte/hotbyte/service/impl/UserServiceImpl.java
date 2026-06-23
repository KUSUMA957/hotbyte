package com.hotbyte.hotbyte.service.impl;

import com.hotbyte.hotbyte.entity.*;
import com.hotbyte.hotbyte.repository.*;
import com.hotbyte.hotbyte.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final MenuRepository menuRepository;
    @Override
    public Map<String, String> addToCart(Long menuId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new RuntimeException("Menu not found"));
        // ✅ check existing item
        Cart cartItem = cartRepository
                .findByUserAndMenu(user, menu)
                .orElse(null);

        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + 1);
        } else {
            cartItem = Cart.builder()
                    .user(user)
                    .menu(menu)
                    .quantity(1)
                    .build();
        }
        cartRepository.save(cartItem);
        return Map.of("message", "Item added to cart ✅");
    }

    @Override
    public List<Cart> getCart(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return cartRepository.findByUser(user);
    }
}