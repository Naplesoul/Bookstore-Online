package com.mybookstore.bookstore.service;

import com.mybookstore.bookstore.entity.UserAuth;

public interface UserService {
    UserAuth checkUser(String username, String password);
}
