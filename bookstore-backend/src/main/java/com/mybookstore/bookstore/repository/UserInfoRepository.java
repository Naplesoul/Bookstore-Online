package com.mybookstore.bookstore.repository;

import com.mybookstore.bookstore.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
    UserInfo findUserInfoByUserId(Integer userId);
}
