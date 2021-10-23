package com.swh.bookstore.repository;

import com.swh.bookstore.entity.UserInfo;
import com.swh.bookstore.utils.dto.UserAvatar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {

    UserInfo findUserInfoByUserId(Integer userId);

    @Modifying
    @Query("update UserInfo u set u.nickname = :nickname, u.name = :name, u.email = :email," +
            "u.tel = :tel, u.address = :address where u.userId = :userId")
    void setUserInfo(Integer userId, String nickname, String name, String email, String tel, String address);

    @Modifying
    @Query("update UserInfo u set u.avatar = :base64Image where u.userId = :userId")
    void setAvatar(Integer userId, String base64Image);

    UserAvatar findUserAvatarByUserId(Integer userId);
}
