package com.hotbyte.hotbyte.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotbyte.hotbyte.entity.Order;
import com.hotbyte.hotbyte.entity.User;
import com.hotbyte.hotbyte.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repo;

    public List<Order> getOrders(User user) {
        return repo.findByUserId(user.getId());
    }
}
