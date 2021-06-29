package com.mybookstore.bookstore.daoimpl;

import com.mybookstore.bookstore.dao.BookDao;
import com.mybookstore.bookstore.entity.Book;
import com.mybookstore.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;



@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book getBookByBookId(Integer bookId) {
        return bookRepository.findBookByBookId(bookId);
    }

    @Override
    public Page<Book> getBooks(Integer page, Integer size, String searchText) {
        Pageable pageable = PageRequest.of(page - 1, size);
        searchText = "%" + searchText + "%";
        return bookRepository.findByBookNameLike(searchText, pageable);
    }

    @Override
    public Boolean setBook(Book book) {
        Book existedBook = bookRepository.findBookByBookId(book.getBookId());
        if (existedBook == null) {
            return false;
        }
        existedBook = bookRepository.findBookByISBN(book.getISBN());
        if (existedBook != null && !existedBook.getBookId().equals(book.getBookId())) {
            return false;
        }
        bookRepository.setBook(book.getBookId(), book.getISBN(), book.getBookName(),
                book.getCategory(), book.getAuthor(), book.getPrice(), book.getIntro(),
                book.getStorage(), book.getImage());
        return true;
    }

    @Override
    public Boolean deleteBook(Integer bookId) {
        Book book = bookRepository.findBookByBookId(bookId);
        if (book == null) {
            return false;
        }
        bookRepository.deleteBookByBookId(bookId);
        return true;
    }

    @Override
    public Book addBook(Book book) {
        Book existedBook = bookRepository.findBookByISBN(book.getISBN());
        if (existedBook != null) {
            Book error = new Book();
            error.setBookId(-1);
            return error;
        } else {
            bookRepository.saveAndFlush(book);
            return book;
        }
    }
}
