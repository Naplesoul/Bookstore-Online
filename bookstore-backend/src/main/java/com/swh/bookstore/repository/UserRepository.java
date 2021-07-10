package com.swh.bookstore.repository;

import com.swh.bookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query(value = "from User where username = :username and password = :password")
    User findUserByUsernameAndPassword(String username, String password);

    User findUserByUserId(Integer userId);

    User findUserByUsername(String username);

    List<User> findAll();

    @Modifying
    @Query("update User u set u.userType = :userType where u.userId = :userId")
    void setUserType(Integer userId, Integer userType);
}
