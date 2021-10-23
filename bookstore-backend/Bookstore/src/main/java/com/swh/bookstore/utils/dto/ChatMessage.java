package com.swh.bookstore.utils.dto;

import com.swh.bookstore.entity.User;
import lombok.Data;

@Data
public class ChatMessage {
    private Integer userId;
    private String username;
    private Integer userType;
    private String messageType;
    private String message;

    public void setUser(User user) {
        userId = user.getUserId();
        username = user.getUsername();
        userType = user.getUserType();
    }
}
