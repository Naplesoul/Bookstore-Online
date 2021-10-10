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
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    private static Integer visitCount = 0;

    @RequestMapping("/getVisitCount")
    public static synchronized Integer getVisitCount() {
        visitCount += 1;
        return visitCount;
    }

    @RequestMapping("/login")
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
            SessionUtil.setUser(userId, user);
        }
        return user;
    }

    @RequestMapping("/autoLogin")
    public User autoLogin() {
        User user = SessionUtil.getUser();
        if (user == null) {
            user = new User();
            user.setUserId(-1);
            return user;
        }
        return user;
    }

    @RequestMapping("/logout")
    public Boolean logout() {
        SessionUtil.invalidateSession();
        return true;
    }

    @RequestMapping("/getUsers")
    public List<User> getUsers() {
        if (SessionUtil.isAdmin()) {
            return userService.getUsers();
        }
        System.out.println("User unauthorized");
        return null;
    }

    @RequestMapping("/signup")
    public User signup(@RequestBody Map<String, String> params) {
        try {
            String username = params.get(Constant.USERNAME);
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
            SessionUtil.setUser(userId, user);
            return user;

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
            Integer userId = params.get(Constant.TARGET_USER_ID);
            Integer userType = params.get(Constant.TARGET_USER_TYPE);
            User user = SessionUtil.getUser();
            if (user == null || !user.getUserType().equals(1) || userId.equals(user.getUserId())) {
                System.out.println("User unauthorized");
                return false;
            }
            if (userType < 0) {
                SessionUtil.invalidateSessionByUserId(userId);
            } else {
                User newUser = new User();
                newUser.setUserId(userId);
                newUser.setUserType(userType);
                SessionUtil.updateUser(newUser);
            }
            return userService.setUserType(userId, userType);
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

    @RequestMapping("/setUserInfo")
    public Boolean setUserInfo(@RequestBody Map<String, UserInfo> params) {
        try {
            User user = SessionUtil.getUser();
            if (user == null) {
                System.out.println("User unauthorized");
                return false;
            }
            Integer userId = user.getUserId();
            UserInfo userInfo = params.get(Constant.USER_INFO);
            return userService.setUserInfo(userId, userInfo);
        } catch (Exception e) {
            System.out.println("Caught an exception in setUserInfo");
            e.printStackTrace();
            return false;
        }
    }

    @RequestMapping("/setAvatar")
    public Boolean setBookImage(@RequestBody Map<String, String> base64Image) {
        try {
            User user = SessionUtil.getUser();
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

    @RequestMapping(value = "/getAvatar", produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public BufferedImage getAvatar(@RequestParam(Constant.USER_ID) Integer userId) {
        return userService.getAvatar(userId);
    }
}
