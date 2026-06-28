package com.hotbyte.hotbyte.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotbyte.hotbyte.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
}
