package com.swh.bookstore.service;

import com.swh.bookstore.entity.Book;
import org.springframework.data.domain.Page;

public interface BookService {
    Book getBookByBookId(Integer bookId);
    Page<Book> getBooks(Integer page, Integer size, Integer searchType, String searchText);
    Page<Book> filterBooks(Book book, Integer page, Integer size);
    Boolean setBook(Integer userId, Book book);
    Boolean deleteBook(Integer userId, Integer bookId);
    Book addBook(Book book);
}
