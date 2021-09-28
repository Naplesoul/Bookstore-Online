package com.swh.bookstore.utils.dto;

import com.swh.bookstore.entity.User;
import lombok.Data;

@Data
public class ConsumptionRank implements Comparable<ConsumptionRank> {
    User user;
    Integer consumption;

    @Override
    public int compareTo(ConsumptionRank to) {
        return to.consumption.compareTo(this.consumption);
    }

    public ConsumptionRank() {}
    public ConsumptionRank(User user, Integer consumption) {
        this.user = user;
        this.consumption = consumption;
    }
}
