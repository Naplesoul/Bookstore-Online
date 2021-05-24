package com.mybookstore.bookstore.dao;

import com.mybookstore.bookstore.utils.orderutils.OrderWithItems;

import java.util.List;

public interface OrderDao {
    List<OrderWithItems> getOrders(Integer userId);
    Boolean placeOrder(OrderWithItems orderWithItems);
}
