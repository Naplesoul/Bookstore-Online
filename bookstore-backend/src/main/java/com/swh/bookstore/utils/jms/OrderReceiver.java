package com.swh.bookstore.utils.jms;

import com.swh.bookstore.entity.Order;
import com.swh.bookstore.service.OrderService;
import com.swh.bookstore.utils.dto.OrderMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

@Component
public class OrderReceiver {

    @Autowired
    OrderService orderService;

    @JmsListener(destination = "orderReceiver")
    public void receiveOrder(OrderMessage orderMessage) {
        try {
            Order order = orderMessage.getOrder();
            orderService.receiveOrder(order);
        } catch (Exception e) {
            System.out.print("下单失败：");
            System.out.println(e.getMessage());
        }
    }
}
