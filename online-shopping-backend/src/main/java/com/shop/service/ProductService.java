package com.shop.service;

import com.shop.entity.Product;
import com.shop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    public List<Product> getAll() { return productRepository.findAll(); }

    public Optional<Product> getById(Long id) { return productRepository.findById(id); }

    public Product create(Product p) { return productRepository.save(p); }

    public Optional<Product> update(Long id, Product p) {
        return productRepository.findById(id).map(existing -> {
            existing.setName(p.getName());
            existing.setDescription(p.getDescription());
            existing.setPrice(p.getPrice());
            existing.setStock(p.getStock());
            existing.setCategory(p.getCategory());
            existing.setImageUrl(p.getImageUrl());
            return productRepository.save(existing);
        });
    }

    public void delete(Long id) { productRepository.deleteById(id); }
}
