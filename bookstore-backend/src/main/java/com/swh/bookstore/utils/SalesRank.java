package com.swh.bookstore.utils;

import com.swh.bookstore.entity.Book;
import lombok.Data;

@Data
public class SalesRank implements Comparable {
    Book book;
    Integer sales;

    @Override
    public int compareTo(Object o) {
        SalesRank to = (SalesRank) o;
        return to.sales.compareTo(this.sales);
    }

    public SalesRank(Book book, Integer sales) {
        this.book = book;
        this.sales = sales;
    }

    public SalesRank() {}
}
