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
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService orderService;

    @RequestMapping("/getOrders")
    public Page<Order> getOrders(@RequestParam(Constant.PAGE) Integer page,
                                 @RequestParam(Constant.SIZE) Integer size,
                                 @RequestParam(Constant.SEARCH_TEXT) String searchText,
                                 @RequestBody Map<String, String> params) {
        Timestamp startTime = Timestamp.valueOf(params.get(Constant.START_TIME));
        Timestamp endTime = Timestamp.valueOf(params.get(Constant.END_TIME));
        User user = SessionUtil.getUser();
        if (user == null) {
            System.out.println("User unauthorized");
            return null;
        }
        Integer userId = user.getUserId();
        Integer userType = user.getUserType();
        return orderService.getOrders(userId, userType, searchText, page, size, startTime, endTime);
    }

    @RequestMapping("/getOrderItems")
    public List<OrderItem> getOrderItems(@RequestParam(Constant.ORDER_ID) Integer orderId) {
        User user = SessionUtil.getUser();
        if (user == null) {
            System.out.println("User unauthorized");
            return null;
        }
        Integer userId = user.getUserId();
        Integer userType = user.getUserType();
        return orderService.getOrderItems(userId, userType, orderId);
    }

    @RequestMapping("/placeOrder")
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

    @RequestMapping("/getSalesRank")
    public Page<SalesRank> getSalesRank(@RequestParam(Constant.PAGE) Integer page,
                                        @RequestParam(Constant.SIZE) Integer size,
                                        @RequestBody Map<String, String> params) {
        User user = SessionUtil.getUser();
        if (user == null) {
            System.out.println("User unauthorized");
            return null;
        }
        Integer userId = user.getUserId();
        Integer userType = user.getUserType();
        Timestamp startTime = Timestamp.valueOf(params.get(Constant.START_TIME));
        Timestamp endTime = Timestamp.valueOf(params.get(Constant.END_TIME));
        return orderService.getSalesRank(userId, userType, page, size, startTime, endTime);
    }

    @RequestMapping("/getConsumptionRank")
    public Page<ConsumptionRank> getConsumptionRank(@RequestParam(Constant.PAGE) Integer page,
                                                    @RequestParam(Constant.SIZE) Integer size,
                                                    @RequestBody Map<String, String> params) {
        if (!SessionUtil.isAdmin()) {
            System.out.println("User unauthorized");
            return null;
        }
        Timestamp startTime = Timestamp.valueOf(params.get(Constant.START_TIME));
        Timestamp endTime = Timestamp.valueOf(params.get(Constant.END_TIME));
        return orderService.getConsumptionRank(page, size, startTime, endTime);
    }

    @RequestMapping("/getTotalSalesAndConsumption")
    public Map<String, Integer> getTotalSalesAndConsumption(@RequestBody Map<String, String> params) {
        User user = SessionUtil.getUser();
        if (user == null) {
            System.out.println("User unauthorized");
            return null;
        }
        Integer userId = user.getUserId();
        Integer userType = user.getUserType();
        Timestamp startTime = Timestamp.valueOf(params.get(Constant.START_TIME));
        Timestamp endTime = Timestamp.valueOf(params.get(Constant.END_TIME));
        return orderService.getTotalSalesAndConsumption(userId, userType, startTime, endTime);
    }

    @RequestMapping(value = "/getOrderItemImage", produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public BufferedImage getOrderItemImage(@RequestParam(Constant.ORDER_ITEM_ID) Integer itemId) {
        return orderService.getOrderItemImage(itemId);
    }
}
