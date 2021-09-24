package com.swh.bookstore.chat;

import com.alibaba.fastjson.JSONObject;
import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.constant.MessageType;
import com.swh.bookstore.entity.User;
import com.swh.bookstore.utils.dto.ChatMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ChatRoom extends TextWebSocketHandler {

    private static final Map<Integer, WebSocketSession> connectedSessions = new ConcurrentHashMap<>();

    @Override
    protected void handleTextMessage(WebSocketSession wsSession, TextMessage message) throws Exception {
        User user = (User) wsSession.getAttributes().get(Constant.USER);
        if (user == null) {
            wsSession.close();
            return;
        }

        ChatMessage chatMessage = JSONObject.parseObject(message.getPayload(), ChatMessage.class);
        chatMessage.setUser(user);
        TextMessage broadcastMessage = new TextMessage(JSONObject.toJSONString(chatMessage));
        broadcast(user.getUserId(), broadcastMessage);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession wsSession) throws Exception {
        User user = (User) wsSession.getAttributes().get(Constant.USER);
        if (user == null) {
            wsSession.close();
            return;
        }
        Integer userId = user.getUserId();
        WebSocketSession existedSession = connectedSessions.get(userId);
        if (existedSession != null && !existedSession.getId().equals(wsSession.getId())) {
            existedSession.close();
        }
        connectedSessions.put(userId, wsSession);
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setUser(user);
        chatMessage.setMessageType(MessageType.JOIN);
        TextMessage broadcastMessage = new TextMessage(JSONObject.toJSONString(chatMessage));
        broadcast(broadcastMessage);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession wsSession, CloseStatus status) throws Exception {
        User user = (User) wsSession.getAttributes().get(Constant.USER);
        if (user == null) {
            return;
        }
        Integer userId = user.getUserId();
        WebSocketSession existedSession = connectedSessions.get(userId);
        if (existedSession != null && existedSession.getId().equals(wsSession.getId())) {
            connectedSessions.remove(userId);
        }
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setUser(user);
        chatMessage.setMessageType(MessageType.LEAVE);
        TextMessage broadcastMessage = new TextMessage(JSONObject.toJSONString(chatMessage));
        broadcast(broadcastMessage);
    }

    public static void broadcast(final TextMessage message) throws IOException {
        for (Map.Entry<Integer, WebSocketSession> entry : connectedSessions.entrySet()) {
            WebSocketSession session = entry.getValue();
            if (session.isOpen()) {
                session.sendMessage(message);
            } else {
                connectedSessions.remove(entry.getKey());
            }
        }
    }

    public static void broadcast(final Integer exceptUserId, final TextMessage message) throws IOException {
        for (Map.Entry<Integer, WebSocketSession> entry : connectedSessions.entrySet()) {
            WebSocketSession session = entry.getValue();
            if (session.isOpen()) {
                if (!entry.getKey().equals(exceptUserId)) {
                    session.sendMessage(message);
                }
            } else {
                connectedSessions.remove(entry.getKey());
            }
        }
    }
}
