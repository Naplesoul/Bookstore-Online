package com.swh.bookstore.serviceimpl;

import com.swh.bookstore.dao.UserDao;
import com.swh.bookstore.entity.User;
import com.swh.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public User checkUser(String username, String password) {
        return userDao.checkUser(username, password);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public User signup(String username, String password, String email) {
        return userDao.signup(username, password, email);
    }

    @Override
    public List<User> getUsers() {
        return userDao.getUsers();
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean setUserType(Integer userId, Integer userType) {
        return userDao.setUserType(userId, userType);
    }

    @Override
    public Boolean getDuplicateUsername(String username) {
        User user = userDao.getUserByUsername(username);
        return user != null;
    }
}
