package com.swh.bookstore.utils.dto;

import com.swh.bookstore.entity.Book;

public class SimplifiedBookImpl implements SimplifiedBook{
    private Integer bookId;
    private Integer price;
    private String bookName;

    public SimplifiedBookImpl() {}

    public SimplifiedBookImpl(Book book) {
        bookId = book.getBookId();
        price = book.getPrice();
        bookName = book.getBookName();
    }

    public SimplifiedBookImpl(Integer _bookId, Integer _price, String _bookName) {
        bookId = _bookId;
        price = _price;
        bookName = _bookName;
    }

    @Override
    public Integer getBookId() {
        return bookId;
    }

    @Override
    public Integer getPrice() {
        return price;
    }

    @Override
    public String getBookName() {
        return bookName;
    }
}
