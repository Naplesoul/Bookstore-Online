package com.mybookstore.bookstore.dao;

import com.mybookstore.bookstore.entity.Book;
import org.springframework.data.domain.Page;

public interface BookDao {
    Book getBookByBookId(Integer bookId);
    Page<Book> getBooks(Integer page, Integer size, String searchText);
    Boolean setBook(Book book);
    Boolean deleteBook(Integer bookId);
    Book addBook(Book book);
}
