package com.swh.bookstore.service;

import com.swh.bookstore.entity.User;

import java.util.List;

public interface UserService {
    User checkUser(String username, String password);
    User signup(String username, String password, String email);
    List<User> getUsers();
    Boolean setUserType(Integer userId, Integer userType);
    Boolean getDuplicateUsername(String username);
}
