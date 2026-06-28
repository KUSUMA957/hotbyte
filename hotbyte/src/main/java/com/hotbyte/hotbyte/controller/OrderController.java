package com.hotbyte.hotbyte.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotbyte.hotbyte.entity.Order;
import com.hotbyte.hotbyte.entity.User;
import com.hotbyte.hotbyte.service.OrderService;
import com.hotbyte.hotbyte.service.UserService;

@RestController
@RequestMapping("/api/user/orders")
public class OrderController {

    @Autowired
    private OrderService service;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Order> get(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        return service.getOrders(user);
    }
}
