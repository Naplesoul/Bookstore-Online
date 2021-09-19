package com.swh.bookstore.utils.objects;

import com.swh.bookstore.entity.OrderItem;
import lombok.Data;

@Data
public class SalesRank implements Comparable {
    OrderItem book;
    Integer sales;

    @Override
    public int compareTo(Object o) {
        SalesRank to = (SalesRank) o;
        return to.sales.compareTo(this.sales);
    }

    public SalesRank(OrderItem book, Integer sales) {
        this.book = book;
        this.sales = sales;
    }

    public SalesRank() {}
}
