package com.mybookstore.bookstore.serviceimpl;

import com.mybookstore.bookstore.dao.UserDao;
import com.mybookstore.bookstore.entity.UserAuth;
import com.mybookstore.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public UserAuth checkUser(String username, String password) {
        return userDao.checkUser(username, password);
    }
}
