package com.swh.bookstore.daoimpl;

import com.swh.bookstore.dao.OrderDao;
import com.swh.bookstore.entity.Book;
import com.swh.bookstore.entity.Order;
import com.swh.bookstore.entity.OrderItem;
import com.swh.bookstore.repository.BookRepository;
import com.swh.bookstore.repository.OrderItemRepository;
import com.swh.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    public Page<Order> getOrders(Integer userId, Integer page, Integer size,
                                 Timestamp startTime, Timestamp endTime, String searchText) {
        return orderRepository.findDistinctOrdersByUserIdAndOrderTimeGreaterThanAndOrderTimeLessThanAndOrderItemsBookNameContaining(
                userId, startTime, endTime, searchText.trim(),
                PageRequest.of(page - 1, size));
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

    @Override
    public List<Order> getAllOrders(Timestamp startTime, Timestamp endTime) {
        return orderRepository.findDistinctOrdersByOrderTimeGreaterThanAndOrderTimeLessThan(startTime, endTime);
    }

    @Override
    public List<Order> getOrders(Integer userId, Timestamp startTime, Timestamp endTime) {
        return orderRepository.findDistinctOrdersByUserIdAndOrderTimeGreaterThanAndOrderTimeLessThan(userId, startTime, endTime);
    }
}
