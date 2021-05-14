package com.mybookstore.bookstore.repository;

import com.mybookstore.bookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
