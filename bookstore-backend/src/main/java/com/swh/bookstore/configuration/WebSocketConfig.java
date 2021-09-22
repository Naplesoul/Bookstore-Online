package com.swh.bookstore.configuration;

import com.swh.bookstore.chat.ChatMessageDistributor;
import com.swh.bookstore.utils.session.WebSocketSessionConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(myHandler(), "/chatRoom").addInterceptors(new WebSocketSessionConverter()).setAllowedOriginPatterns("*");
    }

    @Bean
    public ChatMessageDistributor myHandler() {
        return new ChatMessageDistributor();
    }
}
