package com.swh.bookstore.service;

import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.entity.User;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface UserService {
    User checkUser(String username, String password);
    User signup(String username, String password, String email);
    List<User> getUsers(Integer userId);
    Boolean setUserType(Integer userId, Integer targetUserId, Integer targetUserType);
    Boolean getDuplicateUsername(String username);
}
