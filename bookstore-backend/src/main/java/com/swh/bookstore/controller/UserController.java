package com.swh.bookstore.controller;

import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.entity.User;
import com.swh.bookstore.service.UserService;
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
    public List<User> getUsers(@RequestParam(Constant.USER_ID) Integer userId) {
        return userService.getUsers(userId);
    }

    @RequestMapping("/signup")
    public User signup(@RequestBody Map<String, String> params) {
        try {
            String username = params.get(Constant.USERNAME);
            String password = params.get(Constant.PASSWORD);
            String email = params.get(Constant.EMAIL);
            return userService.signup(username, password, email);
        } catch (Exception e) {
            System.out.println("Caught an exception in signup");
            e.printStackTrace();
            User user = new User();
            user.setUserId(-1);
            return user;
        }
    }

    @RequestMapping("/setUserType")
    public Boolean setUserType(@RequestBody Map<String, Integer> params) {
        try {
            Integer userId = params.get(Constant.USER_ID);
            Integer targetUserId = params.get(Constant.TARGET_USER_ID);
            Integer targetUserType = params.get(Constant.TARGET_USER_TYPE);
            return userService.setUserType(userId, targetUserId, targetUserType);
        } catch (Exception e) {
            System.out.println("Caught an exception in setUserType");
            e.printStackTrace();
            return false;
        }
    }

    @RequestMapping("/getDuplicateUsername")
    public Boolean getDuplicateUsername(@RequestParam(Constant.USERNAME) String username) {
        try {
            return userService.getDuplicateUsername(username);
        } catch (Exception e) {
            System.out.println("Caught an exception in getDuplicateUsername");
            e.printStackTrace();
            return true;
        }
    }
}
