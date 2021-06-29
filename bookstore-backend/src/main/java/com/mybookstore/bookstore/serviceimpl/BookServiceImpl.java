package com.mybookstore.bookstore.serviceimpl;

import com.mybookstore.bookstore.dao.BookDao;
import com.mybookstore.bookstore.dao.UserDao;
import com.mybookstore.bookstore.entity.Book;
import com.mybookstore.bookstore.entity.User;
import com.mybookstore.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public Page<Book> getBooks(Integer page, Integer size, String searchText) {
        return bookDao.getBooks(page, size, searchText);
    }

    @Override
    public Boolean setBook(Integer userId, Book book) {
        // check if the user is admin
        User user = userDao.getUser(userId);
        if (user == null || user.getUserType() != 1) {
            return false;
        }
        return bookDao.setBook(book);
    }

    @Override
    public Boolean deleteBook(Integer userId, Integer bookId) {
        // check if the user is admin
        User user = userDao.getUser(userId);
        if (user == null || user.getUserType() != 1) {
            return false;
        }
        return bookDao.deleteBook(bookId);
    }

    @Override public Book addBook(Book book) {
        return bookDao.addBook(book);
    }
}
