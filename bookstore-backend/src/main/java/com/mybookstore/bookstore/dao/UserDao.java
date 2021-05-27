package com.mybookstore.bookstore.dao;

import com.mybookstore.bookstore.entity.User;

public interface UserDao {
    User checkUser(String username, String password);
}
