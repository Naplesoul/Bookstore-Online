package com.mybookstore.bookstore.service;

import com.mybookstore.bookstore.entity.Book;

import java.util.List;

public interface BookService {
    Book getBookById(Integer id);
    List<Book> getBooks();
}
