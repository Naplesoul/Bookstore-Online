package com.swh.bookstore.serviceimpl;

import com.swh.bookstore.dao.BookDao;
import com.swh.bookstore.dao.UserDao;
import com.swh.bookstore.entity.Book;
import com.swh.bookstore.entity.User;
import com.swh.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

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
    public Page<Book> getBooks(Integer page, Integer size, Integer searchType, String searchText) {
        return bookDao.searchBooks(page, size, searchType, searchText);
    }

    @Override
    public Page<Book> filterBooks(Book book, Integer page, Integer size) {
        return bookDao.filterBooks(book, page, size);
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
