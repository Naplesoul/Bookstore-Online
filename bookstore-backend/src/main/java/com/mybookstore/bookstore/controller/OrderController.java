package com.mybookstore.bookstore.controller;

import com.mybookstore.bookstore.constant.Constant;
import com.mybookstore.bookstore.service.OrderService;
import com.mybookstore.bookstore.utils.orderutils.OrderWithItems;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @CrossOrigin
    @RequestMapping("/getOrders")
    public List<OrderWithItems> getOrders(@RequestBody Map<String, Integer> params) {
        int userId = params.get(Constant.USER_ID);
        return orderService.getOrders(userId);
    }

    @CrossOrigin
    @RequestMapping("/placeOrder")
    public Boolean placeOrder(@RequestBody OrderWithItems params) {
        return orderService.placeOrder(params);
    }
}
