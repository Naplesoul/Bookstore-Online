package com.swh.bookstore.serviceimpl;

import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.dao.BookDao;
import com.swh.bookstore.dao.OrderDao;
import com.swh.bookstore.dao.UserDao;
import com.swh.bookstore.entity.Book;
import com.swh.bookstore.entity.Order;
import com.swh.bookstore.entity.OrderItem;
import com.swh.bookstore.entity.User;
import com.swh.bookstore.service.OrderService;
import com.swh.bookstore.utils.dto.ConsumptionRank;
import com.swh.bookstore.utils.dto.OrderMessage;
import com.swh.bookstore.utils.dto.SalesRank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;

import javax.transaction.Transactional;
import java.awt.image.BufferedImage;
import java.sql.Timestamp;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    WebApplicationContext applicationContext;

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private BookDao bookDao;

    @Override
    public Page<Order> getOrders(Integer userId, Integer userType, String searchText, Integer page, Integer size,
                                 Timestamp startTime, Timestamp endTime) {
        if (userType == 1)
            return orderDao.getAllOrders(page, size, startTime, endTime, searchText);
        else if (userType == 0)
            return orderDao.getOrders(userId, page, size, startTime, endTime, searchText);
        else
            return null;
    }

    @Override
    public List<OrderItem> getOrderItems(Integer userId, Integer userType, Integer orderId) {
        if (userType == 1) {
            return orderDao.getOrderItems(orderId);
        }
        Order order = orderDao.getOrderByOrderId(orderId);
        Integer orderUserId = order.getUserId();
        if (userId.equals(orderUserId)) {
            return orderDao.getOrderItems(orderId);
        }
        return null;
    }

    @Override
    public Boolean placeOrder(OrderMessage orderMessage) {
        JmsTemplate jmsTemplate = applicationContext.getBean(JmsTemplate.class);
        jmsTemplate.convertAndSend("orderTmp", orderMessage);
        return true;
    }

    @JmsListener(destination = "orderTmp")
    public void orderReceiver(OrderMessage orderMessage) {
        Order order = orderMessage.getOrder();
        System.out.println("Order received");
        try {
            saveOrder(order);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
    }

    @Transactional(rollbackOn = Exception.class)
    public void saveOrder(Order order) throws Exception {
        int totalPrice = 0;
        for (OrderItem orderItem : order.getOrderItems()) {
            Book book = bookDao.getBookByBookId(orderItem.getBookId());
            Integer storage = book.getStorage();
            if (storage < orderItem.getBookNum()) {
                throw new Exception("库存不足，无法下单");
            }
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
        orderDao.saveAndFlushOrder(order);

        Integer orderId = order.getOrderId();
        for (OrderItem orderItem : order.getOrderItems()) {
            orderItem.setOrderId(orderId);
            bookDao.reduceStorage(orderItem.getBookId(), orderItem.getBookNum());
            orderDao.saveAndFlushOrderItem(orderItem);
        }
    }

    @Override
    public Page<SalesRank> getSalesRank(Integer userId, Integer userType, Integer page, Integer size, Timestamp startTime, Timestamp endTime) {
        List<Order> orders;
        // if the user is admin, fetch all orders
        if (userType == 1) {
            orders = orderDao.getAllOrders(startTime, endTime);
        } else {
            orders = orderDao.getOrders(userId, startTime, endTime);
        }
        Map<Integer, SalesRank> ranks = new HashMap<>();
        for (Order order : orders) {
            List<OrderItem> items = order.getOrderItems();
            for (OrderItem item : items) {
                Integer bookId = item.getBookId();
                Integer bookNum = item.getBookNum();
                if (ranks.containsKey(bookId)) {
                    ranks.get(bookId).setSales(ranks.get(bookId).getSales() + bookNum);
                } else {
                    SalesRank salesRank = new SalesRank(item, bookNum);
                    ranks.put(bookId, salesRank);
                }
            }
        }
        List<SalesRank> salesRanks = new ArrayList<>(ranks.values());
        Collections.sort(salesRanks);
        Pageable pageable = PageRequest.of(page - 1, size);
        int start = (int)pageable.getOffset();
        // 当前页最后一条数据在List中的位置
        int end = Math.min((start + pageable.getPageSize()), salesRanks.size());
        return new PageImpl<>(salesRanks.subList(start, end), pageable, ranks.size());
    }

    @Override
    public Page<ConsumptionRank> getConsumptionRank(Integer page, Integer size, Timestamp startTime, Timestamp endTime) {
        List<Order> orders = orderDao.getAllOrders(startTime, endTime);
        Map<Integer, ConsumptionRank> ranks = new HashMap<>();
        for (Order order : orders) {
            Integer userId = order.getUserId();
            Integer price = order.getTotalPrice();
            if (ranks.containsKey(userId)) {
                ranks.get(userId).setConsumption(ranks.get(userId).getConsumption() + price);
            } else {
                User user = userDao.getUser(userId);
                ConsumptionRank consumptionRank = new ConsumptionRank(user, price);
                ranks.put(userId, consumptionRank);
            }
        }
        List<ConsumptionRank> consumptionRanks = new ArrayList<>(ranks.values());
        Collections.sort(consumptionRanks);
        Pageable pageable = PageRequest.of(page - 1, size);
        int start = (int)pageable.getOffset();
        // 当前页最后一条数据在List中的位置
        int end = Math.min((start + pageable.getPageSize()), consumptionRanks.size());
        return new PageImpl<>(consumptionRanks.subList(start, end), pageable, ranks.size());
    }

    @Override
    public Map<String, Integer> getTotalSalesAndConsumption(Integer userId, Integer userType, Timestamp startTime, Timestamp endTime) {
        Integer totalSales = 0;
        Integer totalConsumption = 0;
        List<Order> orders;
        // if the user is admin, fetch all orders
        if (userType == 1) {
            orders = orderDao.getAllOrders(startTime, endTime);
        } else {
            orders = orderDao.getOrders(userId, startTime, endTime);
        }
        for (Order order : orders) {
            List<OrderItem> items = order.getOrderItems();
            for (OrderItem item : items) {
                totalSales += item.getBookNum();
            }
            totalConsumption += order.getTotalPrice();
        }
        Map<String, Integer> map = new HashMap<>();
        map.put(Constant.TOTAL_SALES, totalSales);
        map.put(Constant.TOTAL_CONSUMPTION, totalConsumption);
        return map;
    }

    @Override
    public BufferedImage getOrderItemImage(Integer itemId) {
        return orderDao.getOrderItemImage(itemId);
    }
}
