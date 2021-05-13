package com.mybookstore.bookstore.dao;

import com.mybookstore.bookstore.entity.Book;

import java.util.List;

public interface BookDao {
    Book getBookById(int id);
    List<Book> getBooks();
}
