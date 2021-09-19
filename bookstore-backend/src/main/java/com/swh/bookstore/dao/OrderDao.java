package com.swh.bookstore.dao;

import com.swh.bookstore.entity.Order;
import com.swh.bookstore.entity.OrderItem;
import org.springframework.data.domain.Page;

import javax.persistence.criteria.CriteriaBuilder;
import java.awt.image.BufferedImage;
import java.sql.Timestamp;
import java.util.List;

public interface OrderDao {
    Page<Order> getOrders(Integer userId, Integer page, Integer size,
                          Timestamp startTime, Timestamp endTime, String searchText);
    Order getOrderByOrderId(Integer orderId);
    Page<Order> getAllOrders(Integer page, Integer size,
                             Timestamp startTime, Timestamp endTime, String searchText);
    List<OrderItem> getOrderItems(Integer orderId);
    List<Order> getAllOrders(Timestamp startTime, Timestamp endTime);
    List<Order> getOrders(Integer userId, Timestamp startTime, Timestamp endTime);
    BufferedImage getOrderItemImage(Integer itemId);
    Order saveAndFlushOrder(Order order);
    OrderItem saveAndFlushOrderItem(OrderItem orderItem);
}
