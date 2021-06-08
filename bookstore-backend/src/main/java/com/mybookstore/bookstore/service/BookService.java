package com.mybookstore.bookstore.service;

import com.mybookstore.bookstore.entity.Book;

import java.util.List;

public interface BookService {
    Book getBookByBookId(Integer bookId);
    List<Book> getBooks();
    Boolean setBook(Integer userId, Book book);
    Boolean deleteBook(Integer userId, Integer bookId);
    Book addBook(Book book);
}
