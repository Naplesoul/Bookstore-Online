package com.mybookstore.bookstore.daoimpl;

import com.mybookstore.bookstore.dao.OrderDao;
import com.mybookstore.bookstore.entity.Book;
import com.mybookstore.bookstore.entity.Order;
import com.mybookstore.bookstore.entity.OrderItem;
import com.mybookstore.bookstore.repository.BookRepository;
import com.mybookstore.bookstore.repository.OrderItemRepository;
import com.mybookstore.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
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
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Boolean placeOrder(Order order) {

        Integer totalPrice = 0;
        for (OrderItem orderItem : order.getOrderItems()) {
            Book book = bookRepository.findBookByBookId(orderItem.getBookId());
            Integer bookPrice = book.getPrice();
            orderItem.setBookPrice(bookPrice);
            orderItem.setBookName(book.getBookName());
            orderItem.setAuthor(book.getAuthor());
            orderItem.setCategory(book.getCategory());
            orderItem.setImage(book.getImage());
            totalPrice += bookPrice * orderItem.getBookNum();
        }

        order.setOrderTime(new Timestamp(System.currentTimeMillis()));
        order.setTotalPrice(totalPrice);
        orderRepository.saveAndFlush(order);

        Integer orderId = order.getOrderId();
        for (OrderItem orderItem : order.getOrderItems()) {
            orderItem.setOrderId(orderId);
            bookRepository.reduceStorage(orderItem.getBookId(), orderItem.getBookNum());
            orderItemRepository.saveAndFlush(orderItem);
        }

        return true;
    }
}
