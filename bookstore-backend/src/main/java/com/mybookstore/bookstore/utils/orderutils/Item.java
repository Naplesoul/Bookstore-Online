package com.mybookstore.bookstore.utils.orderutils;

import lombok.Data;

@Data
public class Item {
    private Integer bookId;
    private Integer bookNum;

    public Item(Integer _bookId, Integer _bookNum) {
        bookId = _bookId;
        bookNum = _bookNum;
    }
}
