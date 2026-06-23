package com.hotbyte.hotbyte.repository;

import com.hotbyte.hotbyte.entity.Cart;
import com.hotbyte.hotbyte.entity.Menu;
import com.hotbyte.hotbyte.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserAndMenu(User user, Menu menu);
    List<Cart> findByUser(User user);
}
