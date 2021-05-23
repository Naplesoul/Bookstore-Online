package com.mybookstore.bookstore.utils.orderutils;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class OrderWithItems {
    private Integer id;
    private Integer userId;
    private Integer totalPrice;
    private List<Item> items;

    public OrderWithItems(Integer _id, Integer _userId, Integer _totalPrice) {
        id = _id;
        userId = _userId;
        totalPrice = _totalPrice;
        items = new ArrayList<>();
    }

    public void addItem(Item item) {
        items.add(item);
    }
}
