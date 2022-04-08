package com.swh.bookstore.controller;

import com.alibaba.fastjson.JSONObject;
import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.entity.User;
import com.swh.bookstore.fakedata.FakeUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class BookControllerTest {

    @Autowired
    private WebApplicationContext wac;

    private MockMvc mvc;
    private MockHttpSession session;

    private void setNormalUser() {
        User user = FakeUser.normalUser();
        session.setAttribute(Constant.USER_ID, user.getUserId());
        session.setAttribute(Constant.USERNAME, user.getUsername());
        session.setAttribute(Constant.USER_TYPE, user.getUserType());
        session.setAttribute(Constant.USER_INFO, JSONObject.toJSONString(user.getUserInfo()));
    }

    private void setAdminUser() {
        User user = FakeUser.adminUser();
        session.setAttribute(Constant.USER_ID, user.getUserId());
        session.setAttribute(Constant.USERNAME, user.getUsername());
        session.setAttribute(Constant.USER_TYPE, user.getUserType());
        session.setAttribute(Constant.USER_INFO, JSONObject.toJSONString(user.getUserInfo()));
    }

    @BeforeEach
    void setupMockMvc() {
        mvc = MockMvcBuilders.webAppContextSetup(wac).build();
        session = new MockHttpSession();
        setAdminUser();
    }

    @Test
    void getBookByBookId() throws Exception {
        setNormalUser();
        mvc.perform(get("/book/1"))
                .andExpect(status().isOk());
    }

    @Test
    void setBookImage() {
    }

    @Test
    void getBookImage() {
    }

    @Test
    void searchBooksByIntro() {
    }

    @Test
    void getBooks() {
    }

    @Test
    void filterBooks() throws Exception {
        setAdminUser();
        mvc.perform(get("/admin/books")
                        .param(Constant.PAGE, "1")
                        .param(Constant.SIZE, "15")
//                        .param(Constant.BOOK_ID, "0")
//                        .param(Constant.ISBN, "0")
//                        .param(Constant.BOOK_NAME, "0")
//                        .param(Constant.AUTHOR, "0")
//                        .param(Constant.CATEGORY, "0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        setNormalUser();
        mvc.perform(get("/admin/books")
                        .param(Constant.PAGE, "1")
                        .param(Constant.SIZE, "15")
//                        .param(Constant.BOOK_ID, "0")
//                        .param(Constant.ISBN, "0")
//                        .param(Constant.BOOK_NAME, "0")
//                        .param(Constant.AUTHOR, "0")
//                        .param(Constant.CATEGORY, "0")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void setBook() {
    }

    @Test
    void deleteBook() {
    }

    @Test
    void addBook() {
    }

    @Test
    void searchRelatedBooksByLabel() {
    }

    @Test
    void setBookLabels() {
    }
}