package com.swh.bookstore.service;

import com.swh.bookstore.entity.User;
import com.swh.bookstore.entity.UserInfo;

import java.awt.image.BufferedImage;
import java.util.List;

public interface UserService {
    User checkUser(String username, String password);
    User signup(String username, String password, String email);
    List<User> getUsers();
    Boolean setUserType(Integer userId, Integer userType);
    Boolean getDuplicateUsername(String username);
    Boolean setUserInfo(Integer userId, UserInfo userInfo);
    Boolean setAvatar(Integer userId, String base64Image);
    BufferedImage getAvatar(Integer userId);
}
