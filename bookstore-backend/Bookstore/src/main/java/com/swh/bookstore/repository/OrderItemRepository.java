package com.swh.bookstore.repository;

import com.swh.bookstore.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    List<OrderItem> findOrderItemByOrderId(Integer orderId);
}
