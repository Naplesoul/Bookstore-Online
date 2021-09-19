package com.swh.bookstore.controller;

import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.entity.Order;
import com.swh.bookstore.entity.OrderItem;
import com.swh.bookstore.service.OrderService;
import com.swh.bookstore.utils.objects.ConsumptionRank;
import com.swh.bookstore.utils.objects.SalesRank;
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
    public Page<Order> getOrders(@RequestParam(Constant.USER_ID) Integer userId,
                                 @RequestParam(Constant.PAGE) Integer page,
                                 @RequestParam(Constant.SIZE) Integer size,
                                 @RequestParam(Constant.SEARCH_TEXT) String searchText,
                                 @RequestBody Map<String, String> params) {
        Timestamp startTime = Timestamp.valueOf(params.get(Constant.START_TIME));
        Timestamp endTime = Timestamp.valueOf(params.get(Constant.END_TIME));
        return orderService.getOrders(userId, searchText, page, size, startTime, endTime);
    }

    @RequestMapping("/getOrderItems")
    public List<OrderItem> getOrderItems(@RequestParam(Constant.ORDER_ID) Integer orderId) {
        return orderService.getOrderItems(orderId);
    }

    @RequestMapping("/placeOrder")
    public Boolean placeOrder(@RequestBody Order params) {
        try {
            return orderService.placeOrder(params);
        } catch (Exception e) {
            System.out.println("Caught an exception in placeOrder");
            e.printStackTrace();
            return false;
        }
    }

    @RequestMapping("/getSalesRank")
    public Page<SalesRank> getSalesRank(@RequestParam(Constant.USER_ID) Integer userId,
                                        @RequestParam(Constant.PAGE) Integer page,
                                        @RequestParam(Constant.SIZE) Integer size,
                                        @RequestBody Map<String, String> params) {
        Timestamp startTime = Timestamp.valueOf(params.get(Constant.START_TIME));
        Timestamp endTime = Timestamp.valueOf(params.get(Constant.END_TIME));
        return orderService.getSalesRank(userId, page, size, startTime, endTime);
    }

    @RequestMapping("/getConsumptionRank")
    public Page<ConsumptionRank> getConsumptionRank(@RequestParam(Constant.PAGE) Integer page,
                                                    @RequestParam(Constant.SIZE) Integer size,
                                                    @RequestBody Map<String, String> params) {
        Timestamp startTime = Timestamp.valueOf(params.get(Constant.START_TIME));
        Timestamp endTime = Timestamp.valueOf(params.get(Constant.END_TIME));
        return orderService.getConsumptionRank(page, size, startTime, endTime);
    }

    @RequestMapping("/getTotalSalesAndConsumption")
    public Map<String, Integer> getTotalSalesAndConsumption(@RequestParam(Constant.USER_ID) Integer userId,
                                                            @RequestBody Map<String, String> params) {
        Timestamp startTime = Timestamp.valueOf(params.get(Constant.START_TIME));
        Timestamp endTime = Timestamp.valueOf(params.get(Constant.END_TIME));
        return orderService.getTotalSalesAndConsumption(userId, startTime, endTime);
    }

    @RequestMapping(value = "/getOrderItemImage", produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public BufferedImage getOrderItemImage(@RequestParam(Constant.ORDER_ITEM_ID) Integer itemId) {
        return orderService.getOrderItemImage(itemId);
    }
}
