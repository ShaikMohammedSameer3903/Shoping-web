package com.shop.dto;

import java.util.List;

public class CreateOrderRequest {
    private List<OrderItemDto> items;

    public CreateOrderRequest() {}

    public CreateOrderRequest(List<OrderItemDto> items) {
        this.items = items;
    }

    public List<OrderItemDto> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDto> items) {
        this.items = items;
    }

    // Nested DTO for an order item
    public static class OrderItemDto {
        private Long productId;
        private int qty;

        public OrderItemDto() {}

        public OrderItemDto(Long productId, int qty) {
            this.productId = productId;
            this.qty = qty;
        }

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public int getQty() {
            return qty;
        }

        public void setQty(int qty) {
            this.qty = qty;
        }
    }
}
