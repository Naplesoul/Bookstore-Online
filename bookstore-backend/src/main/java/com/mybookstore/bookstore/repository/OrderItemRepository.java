package com.mybookstore.bookstore.repository;

import com.mybookstore.bookstore.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    @Query("select oi from OrderItem oi where oi.orderId = :orderId")
    List<OrderItem> getOrderItems(@Param("orderId") int orderId);
}
