package com.shop.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
class OrderItemRequest {
    private Long productId;
    private Integer qty;
}