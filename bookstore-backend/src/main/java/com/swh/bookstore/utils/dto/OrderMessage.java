package com.swh.bookstore.utils.dto;

import com.swh.bookstore.entity.Order;
import com.swh.bookstore.entity.OrderItem;
import lombok.Data;

import java.util.List;

@Data
public class OrderMessage {
    private Integer userId;
    private List<OrderItem> orderItems;

    public Order getOrder() {
        Order order = new Order();
        order.setUserId(userId);
        order.setOrderItems(orderItems);
        return order;
    }
}
