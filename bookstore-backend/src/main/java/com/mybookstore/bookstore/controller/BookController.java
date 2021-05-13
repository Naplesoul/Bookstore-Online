package com.mybookstore.bookstore.controller;

import com.mybookstore.bookstore.entity.Book;
import com.mybookstore.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @CrossOrigin
    @GetMapping("/getBooks")
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @CrossOrigin
    @GetMapping("/getBook")
    public Book getBookById(@RequestParam("id") Integer id) {
        return bookService.getBookById(id);
    }
}