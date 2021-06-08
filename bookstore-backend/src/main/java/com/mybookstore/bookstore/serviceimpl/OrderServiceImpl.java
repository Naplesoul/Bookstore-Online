package com.mybookstore.bookstore.serviceimpl;

import com.mybookstore.bookstore.dao.OrderDao;
import com.mybookstore.bookstore.dao.UserDao;
import com.mybookstore.bookstore.entity.Order;
import com.mybookstore.bookstore.entity.User;
import com.mybookstore.bookstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderDao orderDao;

    @Autowired
    private UserDao userDao;

    @Override
    public List<Order> getOrders(Integer userId) {
        User user = userDao.getUser(userId);
        if (user == null)
            return null;
        Integer userType = user.getUserType();
        if (userType == 1)
            return orderDao.getAllOrders();
        else
            return orderDao.getOrders(userId);
    }

    @Override
    public Boolean placeOrder(Order order) {
        return orderDao.placeOrder(order);
    }
}
