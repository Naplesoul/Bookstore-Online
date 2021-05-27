package com.mybookstore.bookstore.repository;

import com.mybookstore.bookstore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findOrderByUserId(Integer userId);
}
