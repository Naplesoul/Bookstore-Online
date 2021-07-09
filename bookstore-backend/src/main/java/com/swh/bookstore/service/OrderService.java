package com.swh.bookstore.service;

import com.swh.bookstore.entity.Order;
import com.swh.bookstore.entity.OrderItem;
import com.swh.bookstore.utils.ConsumptionRank;
import com.swh.bookstore.utils.SalesRank;
import org.springframework.data.domain.Page;

import java.awt.image.BufferedImage;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

public interface OrderService {
    Page<Order> getOrders(Integer userId, String searchText, Integer page, Integer size,
                          Timestamp startTime, Timestamp endTime);
    List<OrderItem> getOrderItems(Integer orderId);
    Boolean placeOrder(Order order);
    Page<SalesRank> getSalesRank(Integer userId, Integer page, Integer size, Timestamp startTime, Timestamp endTime);
    Page<ConsumptionRank> getConsumptionRank(Integer page, Integer size, Timestamp startTime, Timestamp endTime);
    Map<String, Integer> getTotalSalesAndConsumption(Integer userId, Timestamp startTime, Timestamp endTime);
    BufferedImage getOrderItemImage(Integer itemId);
}
