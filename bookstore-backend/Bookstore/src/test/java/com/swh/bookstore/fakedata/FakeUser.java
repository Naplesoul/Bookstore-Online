package com.swh.bookstore.fakedata;

import com.swh.bookstore.entity.User;
import com.swh.bookstore.entity.UserInfo;

public class FakeUser {

    static public User normalUser() {
        User user = new User();
        user.setUserId(1);
        user.setUsername("shenwhang");
        user.setUserType(0);

        UserInfo info = new UserInfo();
        info.setUserInfoId(1);
        info.setUserId(1);
        info.setNickname("swh");
        info.setName("SWH");
        info.setEmail("swh@outlook.com");
        info.setTel("13012345678");
        info.setAddress("SJTU");

        user.setUserInfo(info);

        return user;
    }

    static public User adminUser() {
        User user = new User();
        user.setUserId(3);
        user.setUsername("admin");
        user.setUserType(1);

        UserInfo info = new UserInfo();
        info.setUserInfoId(3);
        info.setUserId(3);
        info.setNickname("admin");
        info.setName("admin");
        info.setEmail("admin@sjtu.edu.cn");
        info.setTel("13912345678");
        info.setAddress("SJTU");

        user.setUserInfo(info);

        return user;
    }
}
