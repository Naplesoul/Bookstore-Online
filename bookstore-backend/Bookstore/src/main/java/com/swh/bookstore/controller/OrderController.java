package com.swh.bookstore.controller;

import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.entity.Order;
import com.swh.bookstore.entity.OrderItem;
import com.swh.bookstore.entity.User;
import com.swh.bookstore.service.OrderService;
import com.swh.bookstore.utils.dto.ConsumptionRank;
import com.swh.bookstore.utils.dto.OrderMessage;
import com.swh.bookstore.utils.dto.SalesRank;
import com.swh.bookstore.utils.session.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.awt.image.BufferedImage;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/orderItems/{orderId}")
    public List<OrderItem> getOrderItems(@PathVariable("orderId") Integer orderId) {
        User user = SessionUtil.getUser();
        if (user == null) {
            System.out.println("User unauthorized");
            return null;
        }
        Integer userId = user.getUserId();
        Integer userType = user.getUserType();
        return orderService.getOrderItems(userId, userType, orderId);
    }

    @PostMapping("/order")
    public Boolean placeOrder(@RequestBody OrderMessage order) {
        User user = SessionUtil.getUser();
        if (user == null) {
            System.out.println("User unauthorized");
            return false;
        }
        Integer userId = user.getUserId();
        order.setUserId(userId);
        return orderService.placeOrder(order);
    }

    @GetMapping(value = "/orderItemImage/{orderItemId}", produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public BufferedImage getOrderItemImage(@PathVariable("orderItemId") Integer itemId) {
        return orderService.getOrderItemImage(itemId);
    }

    // 按条件获取订单等操作不可避免地要使用请求参数，用get请求没法带request body
    @GetMapping("/orders")
    public Page<Order> getOrders(@RequestParam(Constant.PAGE) Integer page,
                                 @RequestParam(Constant.SIZE) Integer size,
                                 @RequestParam(Constant.SEARCH_TEXT) String searchText,
                                 @RequestParam(Constant.START_TIME) String _startTime,
                                 @RequestParam(Constant.END_TIME) String _endTime) {
        Timestamp startTime = Timestamp.valueOf(_startTime);
        Timestamp endTime = Timestamp.valueOf(_endTime);
        User user = SessionUtil.getUser();
        if (user == null) {
            System.out.println("User unauthorized");
            return null;
        }
        Integer userId = user.getUserId();
        Integer userType = user.getUserType();
        return orderService.getOrders(userId, userType, searchText, page, size, startTime, endTime);
    }

    @GetMapping("/salesRank")
    public Page<SalesRank> getSalesRank(@RequestParam(Constant.PAGE) Integer page,
                                        @RequestParam(Constant.SIZE) Integer size,
                                        @RequestParam(Constant.START_TIME) String _startTime,
                                        @RequestParam(Constant.END_TIME) String _endTime) {
        User user = SessionUtil.getUser();
        if (user == null) {
            System.out.println("User unauthorized");
            return null;
        }
        Integer userId = user.getUserId();
        Integer userType = user.getUserType();
        Timestamp startTime = Timestamp.valueOf(_startTime);
        Timestamp endTime = Timestamp.valueOf(_endTime);
        return orderService.getSalesRank(userId, userType, page, size, startTime, endTime);
    }

    @GetMapping("/consumptionRank")
    public Page<ConsumptionRank> getConsumptionRank(@RequestParam(Constant.PAGE) Integer page,
                                                    @RequestParam(Constant.SIZE) Integer size,
                                                    @RequestParam(Constant.START_TIME) String _startTime,
                                                    @RequestParam(Constant.END_TIME) String _endTime) {
        if (!SessionUtil.isAdmin()) {
            System.out.println("User unauthorized");
            return null;
        }
        Timestamp startTime = Timestamp.valueOf(_startTime);
        Timestamp endTime = Timestamp.valueOf(_endTime);
        return orderService.getConsumptionRank(page, size, startTime, endTime);
    }

    @GetMapping("/totalSalesAndConsumption")
    public Map<String, Integer> getTotalSalesAndConsumption(
            @RequestParam(Constant.START_TIME) String _startTime,
            @RequestParam(Constant.END_TIME) String _endTime) {
        User user = SessionUtil.getUser();
        if (user == null) {
            System.out.println("User unauthorized");
            return null;
        }
        Integer userId = user.getUserId();
        Integer userType = user.getUserType();
        Timestamp startTime = Timestamp.valueOf(_startTime);
        Timestamp endTime = Timestamp.valueOf(_endTime);
        return orderService.getTotalSalesAndConsumption(userId, userType, startTime, endTime);
    }
}
