package com.swh.bookstore.repository;

import com.swh.bookstore.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
    UserInfo findUserInfoByUserId(Integer userId);
}
