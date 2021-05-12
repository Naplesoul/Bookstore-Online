package com.mybookstore.bookstorebackend.controller;

import com.mybookstore.bookstorebackend.entity.Book;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class BookController {

    @GetMapping("/getBooks")
    public List<Book> getBooks(@RequestBody Map<String, String> params) {


        return null;
    }
}
