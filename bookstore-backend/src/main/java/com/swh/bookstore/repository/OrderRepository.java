package com.swh.bookstore.repository;

import com.swh.bookstore.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    Page<Order> findDistinctOrdersByUserIdAndOrderTimeGreaterThanAndOrderTimeLessThanAndOrderItemsBookNameContaining(
            Integer userId, Timestamp startTime, Timestamp endTime, String searchText,
            Pageable pageable
    );

    Page<Order> findDistinctOrdersByOrderTimeGreaterThanAndOrderTimeLessThanAndOrderItemsBookNameContaining(
            Timestamp startTime, Timestamp endTime, String searchText,
            Pageable pageable
    );

    List<Order> findDistinctOrdersByUserIdAndOrderTimeGreaterThanAndOrderTimeLessThan(Integer userId, Timestamp startTime, Timestamp endTime);

    List<Order> findDistinctOrdersByOrderTimeGreaterThanAndOrderTimeLessThan(Timestamp startTime, Timestamp endTime);
}
