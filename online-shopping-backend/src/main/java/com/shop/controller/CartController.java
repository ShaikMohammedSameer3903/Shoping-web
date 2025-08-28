package com.shop.controller;

import com.shop.entity.CartItem;
import com.shop.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public List<CartItem> getCart(@AuthenticationPrincipal UserDetails ud) {
        return cartService.getCart(ud.getUsername());
    }

    @PostMapping
    public ResponseEntity<CartItem> addItem(
            @AuthenticationPrincipal UserDetails ud,
            @RequestParam Long productId,
            @RequestParam int qty
    ) {
        return ResponseEntity.ok(cartService.addItem(ud.getUsername(), productId, qty));
    }

    @PutMapping
    public ResponseEntity<CartItem> updateQty(
            @AuthenticationPrincipal UserDetails ud,
            @RequestParam Long productId,
            @RequestParam int qty
    ) {
        return ResponseEntity.ok(cartService.updateQty(ud.getUsername(), productId, qty));
    }

    @DeleteMapping
    public ResponseEntity<Void> removeItem(
            @AuthenticationPrincipal UserDetails ud,
            @RequestParam Long productId
    ) {
        cartService.removeItem(ud.getUsername(), productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@AuthenticationPrincipal UserDetails ud) {
        cartService.clearCart(ud.getUsername());
        return ResponseEntity.noContent().build();
    }
}
