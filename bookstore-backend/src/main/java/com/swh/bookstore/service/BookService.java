package com.swh.bookstore.service;

import com.swh.bookstore.entity.Book;
import com.swh.bookstore.utils.SimplifiedBook;
import org.springframework.data.domain.Page;

import java.awt.image.BufferedImage;

public interface BookService {
    Book getBookByBookId(Integer bookId);
    Page<SimplifiedBook> getSimplifiedBooks(Integer page, Integer size, String searchText);
    Page<Book> filterBooks(Book book, Integer page, Integer size);
    Boolean setBook(Integer userId, Book book);
    Boolean deleteBook(Integer userId, Integer bookId);
    Integer addBook(Book book);
    Boolean setBookImage(Integer bookId, String base64Image);
    BufferedImage getBookImage(Integer BookId);
}
