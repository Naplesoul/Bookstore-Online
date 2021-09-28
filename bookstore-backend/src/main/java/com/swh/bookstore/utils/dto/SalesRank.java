package com.swh.bookstore.utils.dto;

import com.swh.bookstore.entity.OrderItem;
import lombok.Data;

@Data
public class SalesRank implements Comparable<SalesRank> {
    OrderItem book;
    Integer sales;

    @Override
    public int compareTo(SalesRank to) {
        return to.sales.compareTo(this.sales);
    }

    public SalesRank(OrderItem book, Integer sales) {
        this.book = book;
        this.sales = sales;
    }

    public SalesRank() {}
}
