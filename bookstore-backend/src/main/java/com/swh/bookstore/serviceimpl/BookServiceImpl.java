package com.swh.bookstore.serviceimpl;

import com.swh.bookstore.dao.BookDao;
import com.swh.bookstore.dao.UserDao;
import com.swh.bookstore.entity.Book;
import com.swh.bookstore.entity.User;
import com.swh.bookstore.service.BookService;
import com.swh.bookstore.utils.SimplifiedBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Autowired
    private UserDao userDao;

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
    public Boolean setBook(Integer userId, Book book) {
        try {
            // check if the user is admin
            User user = userDao.getUser(userId);
            if (user == null || user.getUserType() != 1) {
                return false;
            }
            return bookDao.setBook(book);
        } catch (Exception e) {
            System.out.println("Caught an exception in setBook");
            return false;
        }
    }

    @Override
    public Boolean deleteBook(Integer userId, Integer bookId) {
        try {
            // check if the user is admin
            User user = userDao.getUser(userId);
            if (user == null || user.getUserType() != 1) {
                return false;
            }
            return bookDao.deleteBook(bookId);
        } catch (Exception e) {
            System.out.println("Caught an exception in deleteBook");
            return false;
        }
    }

    @Override public Integer addBook(Book book) {
        return bookDao.addBook(book);
    }

    @Override
    public Boolean setBookImage(Integer bookId, String base64Image) {
        try {
            return bookDao.setBookImage(bookId, base64Image);
        } catch (Exception e) {
            System.out.println("Caught an exception in setBookImage");
            return false;
        }
    }

    @Override
    public BufferedImage getBookImage(Integer bookId) {
        return bookDao.getBookImage(bookId);
    }
}
