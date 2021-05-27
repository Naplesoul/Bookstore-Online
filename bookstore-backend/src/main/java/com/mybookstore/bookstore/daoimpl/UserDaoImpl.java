package com.mybookstore.bookstore.daoimpl;

import com.mybookstore.bookstore.dao.UserDao;
import com.mybookstore.bookstore.entity.User;
import com.mybookstore.bookstore.repository.UserRepository;
import com.mybookstore.bookstore.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
}
