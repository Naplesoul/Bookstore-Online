package com.swh.bookstore.dao;

import com.swh.bookstore.entity.User;
import com.swh.bookstore.entity.UserInfo;

import java.awt.image.BufferedImage;
import java.util.List;

public interface UserDao {
    User checkUser(String username, String password);
    User getUser(Integer userId);
    User signup(String username, String password, String email);
    User getUserByUsername(String username);
    List<User> getUsers();
    Boolean setUserType(Integer userId, Integer userType);
    Boolean setUserInfo(Integer userId, UserInfo userInfo);
    Boolean setAvatar(Integer userId, String base64Image);
    BufferedImage getAvatar(Integer userId);
}
