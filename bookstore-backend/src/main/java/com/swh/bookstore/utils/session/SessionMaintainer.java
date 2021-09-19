package com.swh.bookstore.utils.session;

import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.entity.User;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@WebListener
public class SessionMaintainer implements HttpSessionListener {

    private static final Map<Integer, HttpSession> sessionMap = new ConcurrentHashMap<>();

    @Override
    public void sessionDestroyed(HttpSessionEvent sessionEvent) {
        System.out.println("Session destroyed");
        HttpSession session = sessionEvent.getSession();
        User user = (User) session.getAttribute(Constant.USER);
        if (user == null) {
            return;
        }
        Integer userId = user.getUserId();
        if (userId == null) {
            return;
        }
        HttpSession existedSession = sessionMap.get(userId);
        if (existedSession == null) {
            return;
        }
        String sessionId = session.getId();
        String existedSessionId = existedSession.getId();
        if (existedSessionId.equals(sessionId)) {
            sessionMap.remove(userId);
        }
    }

    public static void invalidateSessionByUserId(Integer userId) {
        HttpSession session = sessionMap.get(userId);
        if (session != null) {
            session.invalidate();
            sessionMap.remove(userId);
        }
    }

    public static void setSessionByUserId(Integer userId, HttpSession session) {
        HttpSession existedSession = sessionMap.get(userId);
        if (existedSession != null) {
            existedSession.invalidate();
        }
        sessionMap.put(userId, session);
    }

    public static HttpSession getSessionByUserId(Integer userId) {
        if (userId == null) {
            return null;
        }
        return sessionMap.get(userId);
    }
}
