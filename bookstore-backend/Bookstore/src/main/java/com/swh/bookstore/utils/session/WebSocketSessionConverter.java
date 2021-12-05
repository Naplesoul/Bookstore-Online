package com.swh.bookstore.utils.session;

import com.alibaba.fastjson.JSONObject;
import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.entity.User;
import com.swh.bookstore.entity.UserInfo;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import javax.servlet.http.HttpSession;
import java.util.Map;

public class WebSocketSessionConverter implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) {
        if (request instanceof ServletServerHttpRequest) {
            ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
            HttpSession httpSession = servletRequest.getServletRequest().getSession(false);
            if (httpSession != null) {
                Integer userId = (Integer) httpSession.getAttribute(Constant.USER_ID);
                Integer userType = (Integer) httpSession.getAttribute(Constant.USER_TYPE);
                String username = (String) httpSession.getAttribute(Constant.USERNAME);
                UserInfo userInfo = JSONObject.parseObject((String) httpSession.getAttribute(Constant.USER_INFO), UserInfo.class);
                if (userId != null && userId > 0 && userType != null && userType >= 0 && username != null) {
                    User user = new User();
                    user.setUserId(userId);
                    user.setUserType(userType);
                    user.setUsername(username);
                    user.setUserInfo(userInfo);
                    attributes.put(Constant.USER, user);
                }
            }
        }
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception exception) {}
}
