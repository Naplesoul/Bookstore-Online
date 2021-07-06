package com.swh.bookstore.utils;

import com.swh.bookstore.entity.User;
import lombok.Data;

@Data
public class ConsumptionRank implements Comparable {
    User user;
    Integer consumption;

    @Override
    public int compareTo(Object o) {
        ConsumptionRank to = (ConsumptionRank) o;
        return to.consumption.compareTo(this.consumption);
    }

    public ConsumptionRank() {}
    public ConsumptionRank(User user, Integer consumption) {
        this.user = user;
        this.consumption = consumption;
    }
}
