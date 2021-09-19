package com.swh.bookstore.daoimpl;

import cn.hutool.core.img.ImgUtil;
import com.swh.bookstore.dao.OrderDao;
import com.swh.bookstore.entity.Order;
import com.swh.bookstore.entity.OrderItem;
import com.swh.bookstore.repository.OrderItemRepository;
import com.swh.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.awt.image.BufferedImage;
import java.sql.Timestamp;
import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    OrderRepository orderRepository;

    @Override
    public Page<Order> getOrders(Integer userId, Integer page, Integer size,
                                 Timestamp startTime, Timestamp endTime, String searchText) {
        return orderRepository.findDistinctOrdersByUserIdAndOrderTimeGreaterThanAndOrderTimeLessThanAndOrderItemsBookNameContaining(
                userId, startTime, endTime, searchText.trim(),
                PageRequest.of(page - 1, size));
    }

    @Override
    public Order getOrderByOrderId(Integer orderId) {
        return orderRepository.findOrderByOrderId(orderId);
    }

    @Override
    public Page<Order> getAllOrders(Integer page, Integer size,
                                    Timestamp startTime, Timestamp endTime, String searchText) {
        return orderRepository.findDistinctOrdersByOrderTimeGreaterThanAndOrderTimeLessThanAndOrderItemsBookNameContaining(
                startTime, endTime, searchText.trim(),
                PageRequest.of(page - 1, size));
    }

    @Override
    public List<OrderItem> getOrderItems(Integer orderId) {
        return orderItemRepository.findOrderItemByOrderId(orderId);
    }

    @Override
    public List<Order> getAllOrders(Timestamp startTime, Timestamp endTime) {
        return orderRepository.findDistinctOrdersByOrderTimeGreaterThanAndOrderTimeLessThan(startTime, endTime);
    }

    @Override
    public List<Order> getOrders(Integer userId, Timestamp startTime, Timestamp endTime) {
        return orderRepository.findDistinctOrdersByUserIdAndOrderTimeGreaterThanAndOrderTimeLessThan(userId, startTime, endTime);
    }

    @Override
    public BufferedImage getOrderItemImage(Integer itemId) {
        String base64Image = orderItemRepository.findOrderItemImageByItemId(itemId).getImage();
        return ImgUtil.toImage(base64Image);
    }

    @Override
    public Order saveAndFlushOrder(Order order) {
        return orderRepository.saveAndFlush(order);
    }

    @Override
    public OrderItem saveAndFlushOrderItem(OrderItem orderItem) {
        return orderItemRepository.saveAndFlush(orderItem);
    }
}
