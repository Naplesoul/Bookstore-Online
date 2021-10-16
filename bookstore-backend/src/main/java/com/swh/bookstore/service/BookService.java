package com.swh.bookstore.service;

import com.swh.bookstore.entity.Book;
import com.swh.bookstore.utils.dto.SimplifiedBook;
import org.springframework.data.domain.Page;

import java.awt.image.BufferedImage;
import java.util.List;

public interface BookService {
    Book getBookByBookId(Integer bookId);
    Page<SimplifiedBook> getBooks(Integer page, Integer size);
    Page<SimplifiedBook> searchBooks(Integer page, Integer size, String searchText);
    Page<SimplifiedBook> searchBooksByIntro(Integer page, Integer size, String searchText);
    List<SimplifiedBook> searchAllBooksByIntro(String searchText);
    Page<Book> filterBooks(Book book, Integer page, Integer size);
    Boolean setBook(Book book);
    Boolean deleteBook(Integer bookId);
    Integer addBook(Book book);
    Boolean setBookImage(Integer bookId, String base64Image);
    BufferedImage getBookImage(Integer bookId);
}
