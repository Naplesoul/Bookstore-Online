package com.mybookstore.bookstore.dao;

import com.mybookstore.bookstore.entity.User;

import java.util.List;

public interface UserDao {
    User checkUser(String username, String password);
    User getUser(Integer userId);
    User signup(String username, String password, String email);
    List<User> getUsers();
    Boolean setUserType(Integer userId, Integer userType);
}
