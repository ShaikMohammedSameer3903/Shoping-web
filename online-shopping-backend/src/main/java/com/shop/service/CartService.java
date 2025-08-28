package com.shop.service;

import com.shop.entity.CartItem;
import com.shop.entity.Product;
import com.shop.entity.User;
import com.shop.repository.CartItemRepository;
import com.shop.repository.ProductRepository;
import com.shop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartItemRepository cartRepo;
    private final ProductRepository productRepo;
    private final UserRepository userRepo;
    // The manual constructor has been removed.

    public List<CartItem> getCart(String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        return cartRepo.findByUser(user);
    }

    public CartItem addItem(String email, Long productId, int qty) {
        User user = userRepo.findByEmail(email).orElseThrow();
        Product product = productRepo.findById(productId).orElseThrow();

        return cartRepo.findByUserAndProduct_Id(user, productId)
                .map(ci -> {
                    ci.setQty(ci.getQty() + qty);
                    return cartRepo.save(ci);
                })
                .orElseGet(() -> cartRepo.save(new CartItem(user, product, qty)));

    }

    public CartItem updateQty(String email, Long productId, int qty) {
        User user = userRepo.findByEmail(email).orElseThrow();
        CartItem item = cartRepo.findByUserAndProduct_Id(user, productId)
                .orElseThrow(() -> new RuntimeException("Item not found in cart"));
        item.setQty(qty);
        return cartRepo.save(item);
    }

    public void removeItem(String email, Long productId) {
        User user = userRepo.findByEmail(email).orElseThrow();
        cartRepo.findByUserAndProduct_Id(user, productId)
                .ifPresent(cartRepo::delete);
    }



    public void clearCart(String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        cartRepo.deleteByUser(user);
    }
}
