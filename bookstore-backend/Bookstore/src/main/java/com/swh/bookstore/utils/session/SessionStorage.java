//package com.swh.bookstore.utils.session;
//
//import com.alibaba.fastjson.JSONArray;
//import com.swh.bookstore.utils.cache.RedisUtil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//import javax.servlet.http.HttpSession;
//import java.util.Set;
//
//@Component
//public class SessionStorage {
//    @Autowired
//    private RedisUtil redisUtil;
//
//    public void put(HttpSession session) {
//        redisUtil.set(
//                "session:" + session.getId(),
//                JSONArray.toJSON(session)
//        );
//    }
//
//    public HttpSession get(String sessionId) {
//        Set<String> keys = redisUtil.keys("session:" + sessionId);
//        for (String key : keys) {
//            return JSONArray.parseObject(redisUtil.get(key).toString(), HttpSession.class);
//        }
//        return null;
//    }
//
//    public void remove(String sessionId) {
//        redisUtil.del("session:" + sessionId);
//    }
//}
