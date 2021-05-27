package com.mybookstore.bookstore.daoimpl;

import com.mybookstore.bookstore.dao.OrderDao;
import com.mybookstore.bookstore.entity.Order;
import com.mybookstore.bookstore.entity.OrderItem;
import com.mybookstore.bookstore.repository.BookRepository;
import com.mybookstore.bookstore.repository.OrderItemRepository;
import com.mybookstore.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    BookRepository bookRepository;

    @Override
    public List<Order> getOrders(Integer userId) {
        return orderRepository.findOrderByUserId(userId);
    }

    @Override
    public Boolean placeOrder(Order order) {
        Integer totalPrice = 0;
        for (OrderItem orderItem : order.getOrderItems()) {
            Integer bookPrice = bookRepository.findBookByBookId(orderItem.getBookId()).getPrice();
            orderItem.setBookPrice(bookPrice);
            totalPrice += bookPrice * orderItem.getBookNum();
        }
        order.setTotalPrice(totalPrice);
        Order savedOrder = orderRepository.saveAndFlush(order);
        Integer orderId = savedOrder.getOrderId();
        for (OrderItem orderItem : order.getOrderItems()) {
            orderItem.setOrderId(orderId);
            bookRepository.reduceStorage(orderItem.getBookId(), orderItem.getBookNum());
            orderItemRepository.saveAndFlush(orderItem);
        }
        return true;
    }
}
