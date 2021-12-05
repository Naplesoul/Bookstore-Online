package com.swh.bookstore.utils.session;

import com.alibaba.fastjson.JSONObject;
import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.entity.User;
import com.swh.bookstore.entity.UserInfo;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Component
public class SessionUtil {

//    @Autowired
//    private SessionMaintainer sessionMaintainer;

//    @Autowired
//    private SessionStorage sessionStorage;

    public boolean checkAuth() {
        User user = getUser();
        return user != null;
    }

    public boolean isAdmin() {
        User user = getUser();
        if (user == null) {
            return false;
        }
        return user.getUserType().equals(1);
    }

    public User getUser() {
        try {
            ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (requestAttributes != null) {
                HttpServletRequest request = requestAttributes.getRequest();
                HttpSession session = request.getSession(false);
                if (session != null) {
                    Integer userId = (Integer) session.getAttribute(Constant.USER_ID);
                    Integer userType = (Integer) session.getAttribute(Constant.USER_TYPE);
                    String username = (String) session.getAttribute(Constant.USERNAME);
                    UserInfo userInfo = JSONObject.parseObject((String) session.getAttribute(Constant.USER_INFO), UserInfo.class);
                    if (userId != null && userId > 0 && userType != null && userType >= 0 && username != null) {
                        User user = new User();
                        user.setUserId(userId);
                        user.setUserType(userType);
                        user.setUsername(username);
                        user.setUserInfo(userInfo);
                        return user;
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

    public void setUser(User user) {
        try {
            ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

            if (requestAttributes != null) {
                HttpServletRequest request = requestAttributes.getRequest();
                HttpSession session = request.getSession(true);

                session.setAttribute(Constant.USER_ID, user.getUserId());
                session.setAttribute(Constant.USERNAME, user.getUsername());
                session.setAttribute(Constant.USER_TYPE, user.getUserType());
                session.setAttribute(Constant.USER_INFO, JSONObject.toJSONString(user.getUserInfo()));
            }
        } catch (Exception e) {
            System.out.println("Session already invalid");
            System.out.println(e.getMessage());
        }
    }

    public void updateUser(User user) {
        setUser(user);
    }

    public void invalidateSession() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            HttpSession session = request.getSession(false);

            if(session != null) {
                session.invalidate();
            }
        }
    }

    public void invalidateSessionByUserId(Integer userId) {
//        sessionMaintainer.invalidateSessionByUserId(userId);
    }
}
