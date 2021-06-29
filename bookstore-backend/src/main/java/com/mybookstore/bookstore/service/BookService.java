package com.mybookstore.bookstore.service;

import com.mybookstore.bookstore.entity.Book;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BookService {
    Book getBookByBookId(Integer bookId);
    Page<Book> getBooks(Integer page, Integer size, String searchText);
    Boolean setBook(Integer userId, Book book);
    Boolean deleteBook(Integer userId, Integer bookId);
    Book addBook(Book book);
}
