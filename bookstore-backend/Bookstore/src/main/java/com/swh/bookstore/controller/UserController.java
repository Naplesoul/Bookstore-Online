package com.swh.bookstore.controller;

import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.entity.User;
import com.swh.bookstore.entity.UserInfo;
import com.swh.bookstore.service.UserService;
import com.swh.bookstore.utils.session.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.awt.image.BufferedImage;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private SessionUtil sessionUtil;

    private static Integer visitCount = 0;

    @GetMapping("/visitCount")
    public static synchronized Integer getVisitCount() {
        visitCount += 1;
        return visitCount;
    }

    @PostMapping("/session")
    public User login(@RequestBody Map<String, String> params) {
        String username = params.get(Constant.USERNAME);
        String password = params.get(Constant.PASSWORD);
        User user = userService.checkUser(username, password);
        if (user == null) {
            user = new User();
            user.setUserId(-1);
            return user;
        }
        Integer userId = user.getUserId();
        Integer userType = user.getUserType();
        if (userId == null || userType == null) {
            user = new User();
            user.setUserId(-1);
            return user;
        }
        user.setPassword(null);
        if (userType >= 0) {
            sessionUtil.setUser(user);
        }
        return user;
    }

    @GetMapping("/session")
    public User autoLogin() {
        User user = sessionUtil.getUser();
        if (user == null) {
            user = new User();
            user.setUserId(-1);
            return user;
        }
        return user;
    }

    @DeleteMapping("/session")
    public Boolean logout() {
        sessionUtil.invalidateSession();
        return true;
    }

    @GetMapping("/admin/users")
    public List<User> getUsers() {
        if (sessionUtil.isAdmin()) {
            return userService.getUsers();
        }
        System.out.println("User unauthorized");
        return null;
    }

    @PostMapping("/user")
    public User signup(@RequestBody Map<String, String> params) {
        try {
            String username = params.get(Constant.USERNAME);
            if (username.contains(":") || username.contains("*") || username.contains("：")
                    || username.contains("/") || username.contains("\\") || username.contains("!")
                    || username.contains("?") || username.contains("&") || username.contains("|")) {
                User user = new User();
                user.setUserId(-1);
                return user;
            }
            String password = params.get(Constant.PASSWORD);
            String email = params.get(Constant.EMAIL);
            User user = userService.signup(username, password, email);
            if (user == null) {
                user = new User();
                user.setUserId(-1);
                return user;
            }
            Integer userId = user.getUserId();
            user.setPassword(null);
            sessionUtil.setUser(user);
            return user;

        } catch (Exception e) {
            System.out.println("Caught an exception in signup");
            e.printStackTrace();
            User user = new User();
            user.setUserId(-1);
            return user;
        }
    }

    @PutMapping("/admin/userType/{userId}")
    public Boolean setUserType(@PathVariable("userId") Integer userId,
                               @RequestBody Map<String, Integer> params) {
        try {
            Integer userType = params.get(Constant.TARGET_USER_TYPE);
            User user = sessionUtil.getUser();
            if (user == null || !user.getUserType().equals(1) || userId.equals(user.getUserId())) {
                System.out.println("User unauthorized");
                return false;
            }
            if (userType < 0) {
                sessionUtil.invalidateSessionByUserId(userId);
            } else {
                User newUser = new User();
                newUser.setUserId(userId);
                newUser.setUserType(userType);
                sessionUtil.updateUser(newUser);
            }
            return userService.setUserType(userId, userType);
        } catch (Exception e) {
            System.out.println("Caught an exception in setUserType");
            e.printStackTrace();
            return false;
        }
    }

    @GetMapping("/reduplicatedUsername/{username}")
    public Boolean getDuplicateUsername(@PathVariable("username") String username) {
        try {
            return userService.getDuplicateUsername(username);
        } catch (Exception e) {
            System.out.println("Caught an exception in getDuplicateUsername");
            e.printStackTrace();
            return true;
        }
    }

    @PutMapping("/userInfo")
    public Boolean setUserInfo(@RequestBody Map<String, UserInfo> params) {
        try {
            User user = sessionUtil.getUser();
            if (user == null) {
                System.out.println("User unauthorized");
                return false;
            }
            Integer userId = user.getUserId();
            UserInfo userInfo = params.get(Constant.USER_INFO);
            if (userService.setUserInfo(userId, userInfo)) {
                user.setUserInfo(userInfo);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            System.out.println("Caught an exception in setUserInfo");
            e.printStackTrace();
            return false;
        }
    }

    @PutMapping("/avatar")
    public Boolean setAvatar(@RequestBody Map<String, String> base64Image) {
        try {
            User user = sessionUtil.getUser();
            if (user == null) {
                System.out.println("User unauthorized");
                return false;
            }
            Integer userId = user.getUserId();
            return userService.setAvatar(userId, base64Image.get(Constant.IMAGE));
        } catch (Exception e) {
            System.out.println("Caught an exception in setAvatar");
            e.printStackTrace();
            return false;
        }
    }

    @GetMapping(value = "/avatar/{userId}", produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public BufferedImage getAvatar(@PathVariable("userId") Integer userId) {
        return userService.getAvatar(userId);
    }
}
