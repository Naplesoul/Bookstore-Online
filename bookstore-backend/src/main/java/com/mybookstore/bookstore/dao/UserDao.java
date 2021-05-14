package com.mybookstore.bookstore.dao;

import com.mybookstore.bookstore.entity.UserAuth;

public interface UserDao {
    UserAuth checkUser(String username, String password);
}
