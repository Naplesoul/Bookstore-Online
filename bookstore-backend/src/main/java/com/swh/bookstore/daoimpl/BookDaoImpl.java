package com.swh.bookstore.daoimpl;

import cn.hutool.core.img.ImgUtil;
import com.swh.bookstore.dao.BookDao;
import com.swh.bookstore.entity.Book;
import com.swh.bookstore.repository.BookRepository;
import com.swh.bookstore.utils.dto.SimplifiedBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.awt.image.BufferedImage;


@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book getBookByBookId(Integer bookId) {
        return bookRepository.findBookByBookId(bookId);
    }

    @Override
    public Page<SimplifiedBook> searchBooks(Integer page, Integer size, String searchText) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return bookRepository.searchSimplifiedBooksByBookNameContaining(searchText, pageable);
    }

    @Override
    public Page<Book> filterBooks(Book book, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        if (book.getBookId() != null) {
            return bookRepository.findBookByBookId(book.getBookId(), pageable);
        }
        if (book.getISBN() != null) {
            return bookRepository.findBookByISBN(book.getISBN(), pageable);
        }
        if (book.getPrice() != null) {
            return bookRepository.findBookByPrice(book.getPrice(), pageable);
        }
        if (book.getStorage() != null) {
            return bookRepository.findBookByStorage(book.getStorage(), pageable);
        }

        if (book.getBookName() == null) {
            book.setBookName("");
        }
        if (book.getCategory() == null) {
            book.setCategory("");
        }
        if (book.getAuthor() == null) {
            book.setAuthor("");
        }
        if (book.getIntro() == null) {
            book.setIntro("");
        }

        return bookRepository.filterBooks("%" + book.getBookName().trim() + "%",
                "%" + book.getCategory().trim() + "%", "%" + book.getAuthor().trim() + "%",
                "%" + book.getIntro().trim() + "%", pageable);
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
        bookRepository.setBook(book.getBookId(), book.getISBN(), book.getBookName(), book.getCategory(),
                book.getAuthor(), book.getPrice(), book.getIntro(), book.getStorage());
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
    public Integer addBook(Book book) {
        Book existedBook = bookRepository.findBookByISBN(book.getISBN());
        if (existedBook != null) {
            return -1;
        } else {
            bookRepository.saveAndFlush(book);
            return book.getBookId();
        }
    }

    @Override
    public Boolean setBookImage(Integer bookId, String base64Image) {
        bookRepository.setBookImage(bookId, base64Image);
        return true;
    }

    @Override
    public BufferedImage getBookImage(Integer bookId) {
        try {
            String base64Image = bookRepository.findBookImageByBookId(bookId).getImage();
            return ImgUtil.toImage(base64Image);
        } catch (Exception e) {
            System.out.println("Fail to get book image");
            return null;
        }
    }

    @Override
    public Boolean reduceStorage(Integer bookId, Integer num) {
        bookRepository.reduceStorage(bookId, num);
        return true;
    }
}
