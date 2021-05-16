package com.mybookstore.bookstore.controller;

import com.mybookstore.bookstore.constant.Constant;
import com.mybookstore.bookstore.entity.UserAuth;
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
    public UserAuth login(@RequestBody Map<String, String> params) {
        String username = params.get(Constant.USERNAME);
        String password = params.get(Constant.PASSWORD);
        UserAuth auth = userService.checkUser(username, password);
        if (auth == null) {
            auth = new UserAuth();
            // return a UserAuth object with id = -1 when fail
            auth.setId(-1);
        }
        return auth;
    }
}
