package com.mybookstore.bookstore.utils.orderutils;

import lombok.Data;

@Data
public class Item {
    private int bookId;
    private Integer bookNum;

    public Item(int _bookId, Integer _bookNum) {
        bookId = _bookId;
        bookNum = _bookNum;
    }
}
