package com.swh.bookstore.chat;

import com.alibaba.fastjson.JSONObject;
import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.entity.User;
import com.swh.bookstore.utils.dto.ChatMessage;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ChatMessageDistributor extends TextWebSocketHandler {

    private static final Map<Integer, WebSocketSession> connectedSessions = new ConcurrentHashMap<>();

    @Override
    protected void handleTextMessage(WebSocketSession wsSession, TextMessage message) throws Exception {
        User user = (User) wsSession.getAttributes().get(Constant.USER);
        Integer userId = user.getUserId();
        WebSocketSession existedSession = connectedSessions.get(userId);
        if (existedSession != null) {
            existedSession.close();
        }
        connectedSessions.put(userId, wsSession);

        ChatMessage chatMessage = JSONObject.parseObject(message.getPayload(), ChatMessage.class);
        chatMessage.setUser(user);
        TextMessage broadcastMessage = new TextMessage(JSONObject.toJSONString(chatMessage));
        for (Map.Entry<Integer, WebSocketSession> entry : connectedSessions.entrySet()) {
            WebSocketSession session = entry.getValue();
            if (session.isOpen()) {
                if (!entry.getKey().equals(userId)) {
                    session.sendMessage(broadcastMessage);
                }
            } else {
                connectedSessions.remove(entry.getKey());
            }
        }
    }
}
