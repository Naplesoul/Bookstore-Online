package com.swh.bookstore.daoimpl;

import com.swh.bookstore.constant.SearchType;
import com.swh.bookstore.dao.BookDao;
import com.swh.bookstore.entity.Book;
import com.swh.bookstore.repository.BookRepository;
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
    public Page<Book> searchBooks(Integer page, Integer size, Integer searchType, String searchText) {
        Pageable pageable = PageRequest.of(page - 1, size);

        if (searchText == null) {
            return bookRepository.findAll(pageable);
        }
        searchText = searchText.trim().toLowerCase();
        if (searchText.length() == 0) {
            return bookRepository.findAll(pageable);
        }

        switch (searchType) {
            case SearchType.BOOKID:
                return bookRepository.findBookByBookId(Integer.parseInt(searchText), pageable);
            case SearchType.ISBN:
                return bookRepository.findBookByISBN(Integer.parseInt(searchText), pageable);
            case SearchType.BOOKNAME:
                searchText = "%" + searchText + "%";
                return bookRepository.findByBookNameLike(searchText, pageable);
            case SearchType.CATEGORY:
                searchText = "%" + searchText + "%";
                return bookRepository.findByCategoryLike(searchText, pageable);
            case SearchType.AUTHOR:
                searchText = "%" + searchText + "%";
                return bookRepository.findByAuthorLike(searchText, pageable);
            case SearchType.PRICE:
                return bookRepository.findBookByPrice(Integer.parseInt(searchText), pageable);
            case SearchType.INTRO:
                searchText = "%" + searchText + "%";
                return bookRepository.findByIntroLike(searchText, pageable);
            case SearchType.STORAGE:
                return bookRepository.findBookByStorage(Integer.parseInt(searchText), pageable);
            case SearchType.IMAGE:
                searchText = "%" + searchText + "%";
                return bookRepository.findByImageLike(searchText, pageable);
        }
        return null;
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
        if (book.getImage() == null) {
            book.setImage("");
        }

        return bookRepository.filterBooks("%" + book.getBookName().trim() + "%",
                "%" + book.getCategory().trim() + "%", "%" + book.getAuthor().trim() + "%",
                "%" + book.getIntro().trim() + "%", "%" + book.getImage().trim() + "%", pageable);
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
