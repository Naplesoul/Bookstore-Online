package com.swh.bookstore.daoimpl;

import cn.hutool.core.img.ImgUtil;
import com.alibaba.fastjson.JSONArray;
import com.swh.bookstore.dao.UserDao;
import com.swh.bookstore.entity.User;
import com.swh.bookstore.entity.UserInfo;
import com.swh.bookstore.repository.UserRepository;
import com.swh.bookstore.repository.UserInfoRepository;
import com.swh.bookstore.utils.cache.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.awt.image.BufferedImage;
import java.util.List;
import java.util.Set;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserInfoRepository userInfoRepository;

    // key pattern: user:userId:username
    // key for avatar: avatar:userId
    @Autowired
    RedisUtil redisUtil;

    @Override
    public User checkUser(String username, String password) {
        Set<String> keys = redisUtil.keys("user:*:" + username);
        for (String key : keys) {
            User user = JSONArray.parseObject(redisUtil.get(key).toString(), User.class);
            if (password.equals(user.getPassword())) {
                return user;
            }
        }
        User user = userRepository.findUserByUsernameAndPassword(username, password);

        if (user != null) {
            user.getUserInfo().setAvatar(null);
            redisUtil.set(
                    "user:" + user.getUserId() + ":" + username,
                    JSONArray.toJSON(user)
            );
        }

        return user;
    }

    @Override
    public User getUser(Integer userId) {
        Set<String> keys = redisUtil.keys("user:" + userId + ":*");
        for (String key : keys) {
            return JSONArray.parseObject(redisUtil.get(key).toString(), User.class);
        }
        User user = userRepository.findUserByUserId(userId);

        if (user != null) {
            user.getUserInfo().setAvatar(null);
            redisUtil.set(
                    "user:" + userId + ":" + user.getUsername(),
                    JSONArray.toJSON(user)
            );
        }

        return user;
    }

    @Override
    public User signup(String username, String password, String email) {
        User user = new User();

        // check if the username is available
        User registeredUser = userRepository.findUserByUsername(username);
        if (registeredUser != null) {
            return null;
        }

        user.setUsername(username);
        user.setPassword(password);
        user.setUserType(0);

        userRepository.saveAndFlush(user);

        UserInfo userInfo = new UserInfo();
        userInfo.setEmail(email);
        userInfo.setUserId(user.getUserId());
        userInfo.setAvatar(null);

        userInfoRepository.save(userInfo);

        user.setUserInfo(userInfo);

        redisUtil.set(
            "user:" + user.getUserId() + ":" + username,
            JSONArray.toJSON(user)
        );
        return user;
    }

    @Override
    public User getUserByUsername(String username) {
        Set<String> keys = redisUtil.keys("user:*:" + username);
        for (String key : keys) {
            return JSONArray.parseObject(redisUtil.get(key).toString(), User.class);
        }
        User user = userRepository.findUserByUsername(username);

        if (user != null) {
            user.getUserInfo().setAvatar(null);
            redisUtil.set(
                    "user:" + user.getUserId() + ":" + username,
                    JSONArray.toJSON(user)
            );
        }

        return user;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public Boolean setUserType(Integer userId, Integer userType) {
        Set<String> keys = redisUtil.keys("user:" + userId + ":*");
        for (String key : keys) {
            redisUtil.del(key);
        }

        User user = userRepository.findUserByUserId(userId);
        if (user == null) {
            return false;
        }
        userRepository.setUserType(userId, userType);
        return true;
    }

    @Override
    public Boolean setUserInfo(Integer userId, UserInfo userInfo) {
        Set<String> keys = redisUtil.keys("user:" + userId + ":*");
        for (String key : keys) {
            redisUtil.del(key);
        }

        UserInfo existedUserInfo = userInfoRepository.findUserInfoByUserId(userId);
        if (existedUserInfo == null) {
            return false;
        }
        userInfoRepository.setUserInfo(userId, userInfo.getNickname(), userInfo.getName(),
                userInfo.getEmail(), userInfo.getTel(), userInfo.getAddress());
        return true;
    }

    @Override
    public Boolean setAvatar(Integer userId, String base64Image) {
        Set<String> keys = redisUtil.keys("avatar:" + userId);
        for (String key : keys) {
            redisUtil.del(key);
        }

        userInfoRepository.setAvatar(userId, base64Image);
        return true;
    }

    @Override
    public BufferedImage getAvatar(Integer userId) {
        try {
            Set<String> keys = redisUtil.keys("avatar:" + userId);
            for (String key : keys) {
                return ImgUtil.toImage(redisUtil.get(key).toString());
            }

            String base64Image = userInfoRepository.findUserAvatarByUserId(userId).getAvatar();

            if (base64Image != null) {
                redisUtil.set(
                        "avatar:" + userId,
                        base64Image
                );
            }
            return ImgUtil.toImage(base64Image);
        } catch (Exception e) {
            System.out.println("Fail to get user avatar");
            return null;
        }
    }
}
