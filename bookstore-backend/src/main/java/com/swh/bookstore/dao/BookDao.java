package com.swh.bookstore.dao;

import com.swh.bookstore.entity.Book;
import com.swh.bookstore.utils.dto.SimplifiedBook;
import org.springframework.data.domain.Page;

import java.awt.image.BufferedImage;
import java.util.List;

public interface BookDao {
    Book getBookByBookId(Integer bookId);
    Page<Book> filterBooks(Book book, Integer page, Integer size);
    List<Book> getBooks();
    Page<SimplifiedBook> getBooks(Integer page, Integer size);
    Boolean setBook(Book book);
    Boolean deleteBook(Integer bookId);
    Integer addBook(Book book);
    Boolean setBookImage(Integer bookId, String base64Image);
    BufferedImage getBookImage(Integer bookId);
    String getBase64BookImage(Integer bookId);
    Boolean reduceStorage(Integer bookId, Integer num);
}
