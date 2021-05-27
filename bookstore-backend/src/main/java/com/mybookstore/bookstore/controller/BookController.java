package com.mybookstore.bookstore.controller;

import com.mybookstore.bookstore.entity.Book;
import com.mybookstore.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping("/getBooks")
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @RequestMapping("/getBook")
    public Book getBookByBookId(@RequestParam("bookId") Integer bookId) {
        return bookService.getBookByBookId(bookId);
    }

    @RequestMapping("/setBook")
    public Boolean setBook(@RequestBody Book book) {
        return bookService.setBook(book);
    }
}
