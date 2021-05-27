package com.mybookstore.bookstore.controller;

import com.mybookstore.bookstore.constant.Constant;
import com.mybookstore.bookstore.entity.Order;
import com.mybookstore.bookstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService orderService;

    @RequestMapping("/getOrders")
    public List<Order> getOrders(@RequestBody Map<String, Integer> params) {
        Integer userId = params.get(Constant.USER_ID);
        return orderService.getOrders(userId);
    }

    @CrossOrigin
    @RequestMapping("/placeOrder")
    public Boolean placeOrder(@RequestBody Order params) {
        return orderService.placeOrder(params);
    }
}
