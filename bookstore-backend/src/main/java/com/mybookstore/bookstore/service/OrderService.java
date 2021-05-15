package com.mybookstore.bookstore.service;

import com.mybookstore.bookstore.utils.orderutils.OrderWithItems;

import java.util.List;

public interface OrderService {
    List<OrderWithItems> getOrders(int userId);
    Boolean placeOrder(OrderWithItems orderWithItems);
}
