package com.mybookstore.bookstore.daoimpl;

import com.mybookstore.bookstore.dao.UserDao;
import com.mybookstore.bookstore.entity.User;
import com.mybookstore.bookstore.entity.UserInfo;
import com.mybookstore.bookstore.repository.UserRepository;
import com.mybookstore.bookstore.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
            user.setUserId(-1);
            return user;
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
}
