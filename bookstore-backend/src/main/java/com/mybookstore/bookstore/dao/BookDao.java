package com.mybookstore.bookstore.dao;

import com.mybookstore.bookstore.entity.Book;

import java.util.List;

public interface BookDao {
    Book getBookByBookId(Integer bookId);
    List<Book> getBooks();
    void setBook(Book book);
}
