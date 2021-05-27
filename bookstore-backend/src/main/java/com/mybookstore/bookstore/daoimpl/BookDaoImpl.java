package com.mybookstore.bookstore.daoimpl;

import com.mybookstore.bookstore.dao.BookDao;
import com.mybookstore.bookstore.entity.Book;
import com.mybookstore.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book getBookByBookId(Integer bookId) {
        return bookRepository.findBookByBookId(bookId);
    }

    @Override
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    @Override
    public void setBook(Book book) {
        bookRepository.setBook(book.getBookId(), book.getISBN(), book.getBookName(),
                book.getCategory(), book.getAuthor(), book.getPrice(), book.getIntro(),
                book.getStorage(), book.getImage());
    }
}
