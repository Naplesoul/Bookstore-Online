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
        return user != null;
    }

    public static boolean isAdmin() {
        User user = getUser();
        if (user == null) {
            return false;
        }
        return user.getUserType().equals(1);
    }

    public static User getUser() {
        try {
            ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (requestAttributes != null) {
                HttpServletRequest request = requestAttributes.getRequest();
                HttpSession session = request.getSession(false);

                if (session != null) {
                    User user = (User) session.getAttribute(Constant.USER);
                    if (user != null) {
                        Integer userId = user.getUserId();
                        Integer userType = user.getUserType();
                        if (userId != null && userId > 0
                                && userType != null && userType >= 0) {
                            return user;
                        }
                    }
                }
            }
            return null;
        } catch (Exception e) {
            System.out.println("Session already invalid");
            System.out.println(e.getMessage());
        }
        return null;
    }

    public static void setUser(Integer userId, User user) {
        try {
            ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

            if (requestAttributes != null) {
                HttpServletRequest request = requestAttributes.getRequest();
                HttpSession session = request.getSession(true);

                session.setAttribute(Constant.USER, user);
                SessionMaintainer.setSessionByUserId(userId, session);
            }
        } catch (Exception e) {
            System.out.println("Session already invalid");
            System.out.println(e.getMessage());
        }
    }

    public static void updateUser(User user) {
        Integer userId = user.getUserId();
        if (userId == null) {
            return;
        }
        try {
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
        } catch (Exception e) {
            System.out.println("Session already invalid");
            System.out.println(e.getMessage());
        }
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
