package com.mybookstore.bookstore.dao;

import com.mybookstore.bookstore.entity.Order;

import java.util.List;

public interface OrderDao {
    List<Order> getOrders(Integer userId);
    Boolean placeOrder(Order order);
}
