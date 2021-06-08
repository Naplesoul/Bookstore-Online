package com.mybookstore.bookstore.dao;

import com.mybookstore.bookstore.entity.Book;

import java.util.List;

public interface BookDao {
    Book getBookByBookId(Integer bookId);
    List<Book> getBooks();
    Boolean setBook(Book book);
    Boolean deleteBook(Integer bookId);
    Book addBook(Book book);
}
