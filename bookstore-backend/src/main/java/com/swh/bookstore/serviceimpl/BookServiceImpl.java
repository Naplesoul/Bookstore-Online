package com.swh.bookstore.serviceimpl;

import com.swh.bookstore.dao.BookDao;
import com.swh.bookstore.entity.Book;
import com.swh.bookstore.service.BookService;
import com.swh.bookstore.utils.dto.SimplifiedBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.awt.image.BufferedImage;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public Book getBookByBookId(Integer bookId) {
        return bookDao.getBookByBookId(bookId);
    }

    @Override
    public Page<SimplifiedBook> getSimplifiedBooks(Integer page, Integer size, String searchText) {
        return bookDao.searchBooks(page, size, searchText);
    }

    @Override
    public Page<Book> filterBooks(Book book, Integer page, Integer size) {
        return bookDao.filterBooks(book, page, size);
    }

    @Override
    @Transactional(isolation = Isolation.REPEATABLE_READ, rollbackFor = Exception.class)
    public Boolean setBook(Book book) {
        return bookDao.setBook(book);
    }

    @Override
    @Transactional(isolation = Isolation.REPEATABLE_READ, rollbackFor = Exception.class)
    public Boolean deleteBook(Integer bookId) {
        return bookDao.deleteBook(bookId);
    }

    @Override public Integer addBook(Book book) {
        return bookDao.addBook(book);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean setBookImage(Integer bookId, String base64Image) {
        return bookDao.setBookImage(bookId, base64Image);
    }

    @Override
    public BufferedImage getBookImage(Integer bookId) {
        return bookDao.getBookImage(bookId);
    }
}
