package com.swh.bookstore.service;

import com.swh.bookstore.entity.Order;
import com.swh.bookstore.entity.OrderItem;
import com.swh.bookstore.utils.dto.ConsumptionRank;
import com.swh.bookstore.utils.dto.OrderMessage;
import com.swh.bookstore.utils.dto.SalesRank;
import org.springframework.data.domain.Page;

import java.awt.image.BufferedImage;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

public interface OrderService {
    Page<Order> getOrders(Integer userId, Integer userType, String searchText, Integer page, Integer size,
                          Timestamp startTime, Timestamp endTime);
    List<OrderItem> getOrderItems(Integer userId, Integer userType, Integer orderId);
    Boolean placeOrder(OrderMessage order);
    void receiveOrder(Order order) throws Exception;
    Page<SalesRank> getSalesRank(Integer userId, Integer userType, Integer page, Integer size, Timestamp startTime, Timestamp endTime);
    Page<ConsumptionRank> getConsumptionRank(Integer page, Integer size, Timestamp startTime, Timestamp endTime);
    Map<String, Integer> getTotalSalesAndConsumption(Integer userId, Integer userType, Timestamp startTime, Timestamp endTime);
}
