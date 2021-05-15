package com.mybookstore.bookstore.serviceimpl;

import com.mybookstore.bookstore.dao.OrderDao;
import com.mybookstore.bookstore.service.OrderService;
import com.mybookstore.bookstore.utils.orderutils.OrderWithItems;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderDao orderDao;

    @Override
    public List<OrderWithItems> getOrders(int userId) {
        return orderDao.getOrders(userId);
    }

    @Override
    public Boolean placeOrder(OrderWithItems orderWithItems) { return orderDao.placeOrder(orderWithItems); }
}
