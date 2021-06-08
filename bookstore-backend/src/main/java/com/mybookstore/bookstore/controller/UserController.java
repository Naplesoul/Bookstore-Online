package com.mybookstore.bookstore.controller;

import com.mybookstore.bookstore.constant.Constant;
import com.mybookstore.bookstore.entity.User;
import com.mybookstore.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    public User login(@RequestBody Map<String, String> params) {
        String username = params.get(Constant.USERNAME);
        String password = params.get(Constant.PASSWORD);
        return userService.checkUser(username, password);
    }

    @RequestMapping("/getUsers")
    public List<User> getUsers(@RequestBody Map<String, Integer> params) {
        return userService.getUsers(params.get(Constant.USER_ID));
    }

    @RequestMapping("/signup")
    public User signup(@RequestBody Map<String, String> params) {
        String username = params.get(Constant.USERNAME);
        String password = params.get(Constant.PASSWORD);
        String email = params.get(Constant.EMAIL);
        return userService.signup(username, password, email);
    }

    @RequestMapping("/setUserType")
    public Boolean setUserType(@RequestBody Map<String, Integer> params) {
        Integer userId = params.get(Constant.USER_ID);
        Integer targetUserId = params.get(Constant.TARGET_USER_ID);
        Integer targetUserType = params.get(Constant.TARGET_USER_TYPE);
        return userService.setUserType(userId, targetUserId, targetUserType);
    }
}
