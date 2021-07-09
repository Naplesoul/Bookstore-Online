package com.swh.bookstore.dao;

import com.swh.bookstore.entity.Order;
import com.swh.bookstore.entity.OrderItem;
import org.springframework.data.domain.Page;

import java.awt.image.BufferedImage;
import java.sql.Timestamp;
import java.util.List;

public interface OrderDao {
    Page<Order> getOrders(Integer userId, Integer page, Integer size,
                          Timestamp startTime, Timestamp endTime, String searchText);
    Page<Order> getAllOrders(Integer page, Integer size,
                             Timestamp startTime, Timestamp endTime, String searchText);
    List<OrderItem> getOrderItems(Integer orderId);
    List<Order> getAllOrders(Timestamp startTime, Timestamp endTime);
    List<Order> getOrders(Integer userId, Timestamp startTime, Timestamp endTime);
    Boolean placeOrder(Order order);
    BufferedImage getOrderItemImage(Integer itemId);
}
