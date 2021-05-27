package com.mybookstore.bookstore.repository;

import com.mybookstore.bookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query(value = "from User where username = :username and password = :password")
    User findUserByUsernameAndPassword(String username, String password);
}
