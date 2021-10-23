package com.swh.searchbook.controller;

import com.swh.searchbook.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    // 按条件获取书等操作不可避免地要使用请求参数，用get请求没法带request body
    @GetMapping("/author/{bookName}")
    public String getAuthorByBookName(@PathVariable("bookName") String bookName) {
        return bookService.getAuthorByBookName(bookName);
    }
}
