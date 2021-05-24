package com.mybookstore.bookstore.daoimpl;

import com.mybookstore.bookstore.dao.OrderDao;
import com.mybookstore.bookstore.entity.Order;
import com.mybookstore.bookstore.entity.OrderItem;
import com.mybookstore.bookstore.repository.BookRepository;
import com.mybookstore.bookstore.repository.OrderItemRepository;
import com.mybookstore.bookstore.repository.OrderRepository;
import com.mybookstore.bookstore.utils.orderutils.Item;
import com.mybookstore.bookstore.utils.orderutils.OrderWithItems;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
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
    public List<OrderWithItems> getOrders(Integer userId) {
        List<Order> userOrders = orderRepository.getOrders(userId);
        List<OrderWithItems> orders = new ArrayList<>();
        for (Order order : userOrders) {
            OrderWithItems orderWithItems = new OrderWithItems(order.getId(), order.getUserId(), order.getTotalPrice());
            List<OrderItem> items = orderItemRepository.getOrderItems(order.getId());
            for (OrderItem item : items) {
                orderWithItems.addItem(new Item(item.getBookId(), item.getBookNum()));
            }
            orders.add(orderWithItems);
        }
        return orders;
    }

    @Override
    public Boolean placeOrder(OrderWithItems orderWithItems) {
        Order order = new Order();
        order.setUserId(orderWithItems.getUserId());
        order.setTotalPrice(orderWithItems.getTotalPrice());
        Order savedOrder = orderRepository.save(order);
        Integer orderId = savedOrder.getId();
        for (Item item : orderWithItems.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(orderId);
            orderItem.setBookId(item.getBookId());
            orderItem.setBookNum(item.getBookNum());
            bookRepository.reduceStorage(item.getBookId(), item.getBookNum());
            orderItemRepository.saveAndFlush(orderItem);
        }
        return true;
    }
}
