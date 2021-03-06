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
        User user = userDao.checkUser(username, password);
        if (user == null) {
            user = new User();
            // return a UserAuth object with id = -1 when fail
            user.setUserId(-1);
        }
        return user;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public User signup(String username, String password, String email) {
        return userDao.signup(username, password, email);
    }

    @Override
    public List<User> getUsers(Integer userId) {
        // check authority
        User user = userDao.getUser(userId);
        if (user == null || user.getUserType() != 1) {
            return null;
        }
        return userDao.getUsers();
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Boolean setUserType(Integer userId, Integer targetUserId, Integer targetUserType) {
        if (userId.equals(targetUserId)) {
            return false;
        }
        // check authority
        User user = userDao.getUser(userId);
        if (user == null || user.getUserType() != 1) {
            return false;
        }
        return userDao.setUserType(targetUserId, targetUserType);
    }

    @Override
    public Boolean getDuplicateUsername(String username) {
        User user = userDao.getUserByUsername(username);
        return user != null;
    }
}
