package com.mybookstore.bookstore.controller;

import com.mybookstore.bookstore.constant.Constant;
import com.mybookstore.bookstore.entity.User;
import com.mybookstore.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
public class LoginController {
    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    public User login(@RequestBody Map<String, String> params) {
        String username = params.get(Constant.USERNAME);
        String password = params.get(Constant.PASSWORD);
        User user = userService.checkUser(username, password);
        if (user == null) {
            user = new User();
            // return a UserAuth object with id = -1 when fail
            user.setUserId(-1);
        }
        return user;
    }
}
