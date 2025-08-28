package com.shop.controller;

import com.shop.dto.CreateOrderRequest;
import com.shop.entity.Order;
import com.shop.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class OrderController {

    private final OrderService orderService;
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> create(@RequestBody CreateOrderRequest req, @AuthenticationPrincipal UserDetails ud) {
        var items = req.getItems().stream().map(i -> new OrderService.Item(i.getProductId(), i.getQty())).toList();
        Order o = orderService.create(ud.getUsername(), items);
        return ResponseEntity.ok(o);
    }

    @GetMapping
    public List<Order> list(@AuthenticationPrincipal UserDetails ud) {
        return orderService.list(ud.getUsername());
    }
}
