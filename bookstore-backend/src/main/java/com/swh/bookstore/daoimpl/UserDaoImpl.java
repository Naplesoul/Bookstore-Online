package com.swh.bookstore.daoimpl;

import cn.hutool.core.img.ImgUtil;
import com.swh.bookstore.dao.UserDao;
import com.swh.bookstore.entity.User;
import com.swh.bookstore.entity.UserInfo;
import com.swh.bookstore.repository.UserRepository;
import com.swh.bookstore.repository.UserInfoRepository;
import com.swh.bookstore.utils.dto.UserAvatar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.awt.image.BufferedImage;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserInfoRepository userInfoRepository;

    @Override
    public User checkUser(String username, String password) {
        return userRepository.findUserByUsernameAndPassword(username, password);
    }

    @Override
    public User getUser(Integer userId) {
        return userRepository.findUserByUserId(userId);
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

        userInfoRepository.save(userInfo);

        user.setUserInfo(userInfo);

        return user;
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public Boolean setUserType(Integer userId, Integer userType) {
        User user = userRepository.findUserByUserId(userId);
        if (user == null) {
            return false;
        }
        userRepository.setUserType(userId, userType);
        return true;
    }

    @Override
    public Boolean setUserInfo(Integer userId, UserInfo userInfo) {
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
        userInfoRepository.setAvatar(userId, base64Image);
        return true;
    }

    @Override
    public BufferedImage getAvatar(Integer userId) {
        try {
            String base64Image = userInfoRepository.findUserAvatarByUserId(userId).getAvatar();
            return ImgUtil.toImage(base64Image);
        } catch (Exception e) {
            System.out.println("Fail to get user avatar");
            return null;
        }
    }
}
