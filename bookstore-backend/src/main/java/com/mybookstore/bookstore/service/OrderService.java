package com.mybookstore.bookstore.service;

import com.mybookstore.bookstore.entity.Order;

import java.util.List;

public interface OrderService {
    List<Order> getOrders(int userId);
    Boolean placeOrder(Order order);
}
