package com.swh.bookstore.controller;

import com.alibaba.fastjson.JSONObject;
import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.entity.Book;
import com.swh.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping("/getBooks")
    public Page<Book> getBooks(@RequestParam("page") Integer page,
                               @RequestParam("size") Integer size,
                               @RequestParam("searchType") Integer searchType,
                               @RequestParam("searchText") String searchText) {
        return bookService.getBooks(page, size, searchType, searchText);
    }

    @RequestMapping("/filterBooks")
    Page<Book> filterBooks(@RequestParam("page") Integer page,
                           @RequestParam("size") Integer size,
                           @RequestBody Book book) {
        return bookService.filterBooks(book, page, size);
    }

    @RequestMapping("/getBook")
    public Book getBookByBookId(@RequestParam("bookId") Integer bookId) {
        return bookService.getBookByBookId(bookId);
    }

    @RequestMapping("/setBook")
    public Boolean setBook(@RequestBody JSONObject params) {
        Integer userId = params.getInteger(Constant.USER_ID);
        JSONObject bookJson = params.getJSONObject(Constant.BOOK);
        Book book = bookJson.toJavaObject(Book.class);
        return bookService.setBook(userId, book);
    }

    @RequestMapping("/deleteBook")
        public Boolean deleteBook(@RequestBody Map<String, Integer> params) {
        return bookService.deleteBook(params.get(Constant.USER_ID), params.get(Constant.BOOK_ID));
    }

    @RequestMapping("/addBook")
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }
}
