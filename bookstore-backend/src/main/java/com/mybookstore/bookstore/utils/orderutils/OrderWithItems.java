package com.mybookstore.bookstore.utils.orderutils;

import lombok.Data;
import net.sf.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

@Data
public class OrderWithItems {
    private int id;
    private int userId;
    private Double totalPrice;
    private List<Item> items;

    public OrderWithItems(int _id, int _userId, Double _totalPrice) {
        id = _id;
        userId = _userId;
        totalPrice = _totalPrice;
        items = new ArrayList<>();
    }

    public void addItem(Item item) {
        items.add(item);
    }
}
