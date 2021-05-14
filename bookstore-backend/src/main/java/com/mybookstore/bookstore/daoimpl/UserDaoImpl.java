package com.mybookstore.bookstore.daoimpl;

import com.mybookstore.bookstore.dao.UserDao;
import com.mybookstore.bookstore.entity.UserAuth;
import com.mybookstore.bookstore.repository.UserAuthRepository;
import com.mybookstore.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    UserAuthRepository userAuthRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public UserAuth checkUser(String username, String password) {
        return userAuthRepository.checkUser(username, password);
    }
}
