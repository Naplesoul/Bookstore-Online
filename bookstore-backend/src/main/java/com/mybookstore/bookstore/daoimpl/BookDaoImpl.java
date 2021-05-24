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
    public Book getBookById(int id) {
        return bookRepository.getOne(id);
    }

    @Override
    public List<Book> getBooks() {
        return bookRepository.getBooks();
    }

    @Override
    public void setBook(Book book) {
        bookRepository.setBook(book.getId(), book.getName(), book.getCategory(), book.getAuthor(),
                book.getPrice(), book.getIntro(), book.getStorage(), book.getImage());
    }
}
