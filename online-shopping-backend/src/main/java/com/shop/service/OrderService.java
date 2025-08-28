package com.shop.service;

import com.shop.entity.*;
import com.shop.repository.OrderRepository;
import com.shop.repository.ProductRepository;
import com.shop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    public OrderService(OrderRepository orderRepository,
            ProductRepository productRepository,
            UserRepository userRepository) {
this.orderRepository = orderRepository;
this.productRepository = productRepository;
this.userRepository = userRepository;
}
    public Order create(String userEmail, List<Item> items) {
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        Order order = new Order();
        order.setUser(user);
        order.setCreatedAt(Instant.now());
        order.setStatus("PLACED");

        double total = 0.0;
        for (Item it : items) {
            Product p = productRepository.findById(it.productId()).orElseThrow();
            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setProduct(p);
            oi.setQuantity(it.qty());
            oi.setPrice(p.getPrice());
            order.getItems().add(oi);
            total += p.getPrice() * it.qty();
        }
        order.setTotal(total);
        return orderRepository.save(order);
    }

    public List<Order> list(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        return orderRepository.findByUser(user);
    }

    public record Item(Long productId, Integer qty) {}
}
