package com.mybookstore.bookstore.repository;

import com.mybookstore.bookstore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("select o from Order o where o.userId = :userId")
    List<Order> getOrders(@Param("userId") Integer userId);
}
