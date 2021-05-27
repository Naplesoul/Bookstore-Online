package com.mybookstore.bookstore.service;

import com.mybookstore.bookstore.entity.User;

public interface UserService {
    User checkUser(String username, String password);
}
