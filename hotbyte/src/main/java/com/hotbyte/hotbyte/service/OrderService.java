package com.hotbyte.hotbyte.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotbyte.hotbyte.entity.Address;
import com.hotbyte.hotbyte.entity.Cart;
import com.hotbyte.hotbyte.entity.Order;
import com.hotbyte.hotbyte.entity.OrderItem;
import com.hotbyte.hotbyte.entity.User;
import com.hotbyte.hotbyte.repository.AddressRepository;
import com.hotbyte.hotbyte.repository.CartRepository;
import com.hotbyte.hotbyte.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    @Autowired
    private OrderRepository repo;
    private final CartRepository cartRepo;
    private final OrderRepository orderRepo;
    private final AddressRepository addressRepo;

    public List<Order> getOrders(User user) {
        return repo.findByUserId(user.getId());
    }
  
    public Order placeOrder(User user) {

        // ✅ 1. Get cart items
        List<Cart> cartItems = cartRepo.findByUser(user);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty ❌");
        }

        // ✅ 2. Get selected address
        Address address = addressRepo
                .findByUserIdAndIsSelectedTrue(user.getId())
                .orElseThrow(() -> new RuntimeException("No address selected ❌"));

        // ✅ 3. Create order
        Order order = new Order();
        order.setUser(user);
        order.setAddress(address);
        order.setStatus("PLACED");
        order.setCreatedAt(LocalDateTime.now());

        List<OrderItem> items = new ArrayList<>();

        double total = 0;

        for (Cart cart : cartItems) {

            OrderItem item = new OrderItem();
            item.setMenu(cart.getMenu());
            item.setQuantity(cart.getQuantity());
            item.setOrder(order);

            items.add(item);

            total += cart.getMenu().getPrice() * cart.getQuantity();
        }

        order.setItems(items);
        order.setTotalAmount(total);

        // ✅ 4. Save order
        orderRepo.save(order);

        // ✅ 5. Clear cart
        cartRepo.deleteAll(cartItems);

        return order;
    }

}
