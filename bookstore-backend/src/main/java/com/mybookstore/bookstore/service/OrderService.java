package com.mybookstore.bookstore.service;

import com.mybookstore.bookstore.entity.Order;

import java.util.List;

public interface OrderService {
    List<Order> getOrders(Integer userId);
    Boolean placeOrder(Order order);
}
