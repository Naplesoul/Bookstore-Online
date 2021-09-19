package com.swh.bookstore.utils.session;

import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.entity.User;
import com.swh.bookstore.entity.UserInfo;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionUtil {

    public static boolean checkAuth() {
        User user = getUser();
        if (user == null) {
            return false;
        }
        Integer userType = user.getUserType();
        return userType != null && userType >= 0;
    }

    public static boolean isAdmin() {
        User user = getUser();
        if (user == null) {
            return false;
        }
        Integer userType = user.getUserType();
        return userType != null && userType == 1;
    }

    public static User getUser() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            HttpSession session = request.getSession(false);

            if (session != null) {
                return (User) session.getAttribute(Constant.USER);
            }
        }
        return null;
    }

    public static void setUser(Integer userId, User user) {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            HttpSession session = request.getSession();

            if (session != null) {
                session.setAttribute(Constant.USER, user);
                SessionMaintainer.setSessionByUserId(userId, session);
            }
        }
    }

    public static void updateUser(User user) {
        Integer userId = user.getUserId();
        if (userId == null) {
            return;
        }
        HttpSession session = SessionMaintainer.getSessionByUserId(userId);
        if (session == null) {
            return;
        }
        User existedUser = (User) session.getAttribute(Constant.USER);
        if (existedUser == null) {
            return;
        }
        String newUsername = user.getUsername();
        Integer newUserType = user.getUserType();
        UserInfo newUserInfo = user.getUserInfo();
        User newUser = new User();
        newUser.setUserId(userId);
        newUser.setUsername(newUsername == null ? existedUser.getUsername() : newUsername);
        newUser.setUserType(newUserType == null ? existedUser.getUserType() : newUserType);
        newUser.setUserInfo(newUserInfo == null ? existedUser.getUserInfo() : newUserInfo);
        session.setAttribute(Constant.USER, newUser);
    }

    public static void invalidateSession() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            HttpSession session = request.getSession(false);

            if(session != null) {
                session.invalidate();
            }
        }
    }

    public static void invalidateSessionByUserId(Integer userId) {
        SessionMaintainer.invalidateSessionByUserId(userId);
    }
}
