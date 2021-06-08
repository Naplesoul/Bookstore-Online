package com.mybookstore.bookstore.service;

import com.mybookstore.bookstore.entity.User;

import java.util.List;

public interface UserService {
    User checkUser(String username, String password);
    User signup(String username, String password, String email);
    List<User> getUsers(Integer userId);
    Boolean setUserType(Integer userId, Integer targetUserId, Integer targetUserType);
}
