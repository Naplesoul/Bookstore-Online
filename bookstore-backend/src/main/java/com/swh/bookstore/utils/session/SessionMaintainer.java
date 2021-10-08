package com.swh.bookstore.utils.session;

import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.entity.User;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@WebListener
public class SessionMaintainer implements HttpSessionListener {

    // store session of users that have been logged in
    // used to support SSO (Single Sign On)
    private static final Map<Integer, HttpSession> sessionMap = new ConcurrentHashMap<>();
    private static final Lock lock = new ReentrantLock();

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
        lock.lock();
        HttpSession existedSession = sessionMap.get(userId);
        if (existedSession == null) {
            lock.unlock();
            return;
        }
        String sessionId = session.getId();
        String existedSessionId = existedSession.getId();
        if (existedSessionId.equals(sessionId)) {
            try {
                session.removeAttribute(Constant.USER);
                sessionMap.remove(userId);
            } catch (Exception e) {
                System.out.println("Session already invalid");
                System.out.println(e.getMessage());
            }
        }
        lock.unlock();
    }

    public static void invalidateSessionByUserId(Integer userId) {
        HttpSession session = sessionMap.get(userId);
        if (session != null) {
            session.invalidate();
        }
    }

    public static void setSessionByUserId(Integer userId, HttpSession session) {
        HttpSession existedSession = sessionMap.get(userId);
        if (existedSession != null) {
            existedSession.invalidate();
        }
        lock.lock();
        try {
            // check if the session has been invalid
            User user = (User) session.getAttribute(Constant.USER);
            if (user != null) {
                sessionMap.put(userId, session);
            }
        } catch (Exception e) {
            System.out.println("Session already invalid");
            System.out.println(e.getMessage());
        }
        lock.unlock();
    }

    public static HttpSession getSessionByUserId(Integer userId) {
        if (userId == null) {
            return null;
        }
        return sessionMap.get(userId);
    }
}
