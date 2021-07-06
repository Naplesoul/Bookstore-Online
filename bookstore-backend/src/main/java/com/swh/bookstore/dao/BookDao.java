package com.swh.bookstore.dao;

import com.swh.bookstore.entity.Book;
import org.springframework.data.domain.Page;

public interface BookDao {
    Book getBookByBookId(Integer bookId);
    Page<Book> searchBooks(Integer page, Integer size, Integer searchType, String searchText);
    Page<Book> filterBooks(Book book, Integer page, Integer size);
    Boolean setBook(Book book);
    Boolean deleteBook(Integer bookId);
    Book addBook(Book book);
}
