package com.swh.bookstore.daoimpl;

import cn.hutool.core.img.ImgUtil;
import com.alibaba.fastjson.JSONArray;
import com.swh.bookstore.dao.BookDao;
import com.swh.bookstore.entity.Book;
import com.swh.bookstore.repository.BookRepository;
import com.swh.bookstore.utils.cache.RedisUtil;
import com.swh.bookstore.utils.dto.SimplifiedBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.awt.image.BufferedImage;
import java.util.List;
import java.util.Set;


@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepository;

    // key pattern: book:bookId:bookName
    // key for image: bookImage:bookId
    @Autowired
    RedisUtil redisUtil;

    @Override
    public Book getBookByBookId(Integer bookId) {
        Set<String> keys = redisUtil.keys("book:" + bookId + ":*");
        for (String key : keys) {
            return JSONArray.parseObject(redisUtil.get(key).toString(), Book.class);
        }

        Book book = bookRepository.findBookByBookId(bookId);

        if (book != null) {
            book.setImage(null);
            redisUtil.set(
                    "book:" + bookId + ":" + book.getBookName(),
                    JSONArray.toJSON(book)
            );
        }

        return book;
    }

    @Override
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Page<SimplifiedBook> getBooks(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return bookRepository.findSimplifiedBooksBy(pageable);
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
        Set<String> keys = redisUtil.keys("book:" + book.getBookId() + ":*");
        for (String key : keys) {
            redisUtil.del(key);
        }

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
        Set<String> keys = redisUtil.keys("book:" + bookId + ":*");
        for (String key : keys) {
            redisUtil.del(key);
        }

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
        Set<String> keys = redisUtil.keys("bookImage:" + bookId);
        for (String key : keys) {
            redisUtil.del(key);
        }

        bookRepository.setBookImage(bookId, base64Image);
        return true;
    }

    @Override
    public String getBase64BookImage(Integer bookId) {
        try {
            Set<String> keys = redisUtil.keys("bookImage:" + bookId);
            for (String key : keys) {
                return redisUtil.get(key).toString();
            }

            String base64Image = bookRepository.findBookImageByBookId(bookId).getImage();

            if (base64Image != null) {
                redisUtil.set(
                        "bookImage:" + bookId,
                        base64Image
                );
            }
            return base64Image;
        } catch (Exception e) {
            System.out.println("Fail to get book image");
            return null;
        }
    }

    @Override
    public BufferedImage getBookImage(Integer bookId) {
        try {
            Set<String> keys = redisUtil.keys("bookImage:" + bookId);
            for (String key : keys) {
                return ImgUtil.toImage(redisUtil.get(key).toString());
            }

            String base64Image = bookRepository.findBookImageByBookId(bookId).getImage();

            if (base64Image != null) {
                redisUtil.set(
                        "bookImage:" + bookId,
                        base64Image
                );
            }
            return ImgUtil.toImage(base64Image);
        } catch (Exception e) {
            System.out.println("Fail to get book image");
            return null;
        }
    }

    @Override
    public Boolean reduceStorage(Integer bookId, Integer num) {
        boolean foundInRedis = false;
        Book book = null;
        Set<String> keys = redisUtil.keys("book:" + bookId + ":*");
        for (String key : keys) {
            book = JSONArray.parseObject(redisUtil.get(key).toString(), Book.class);
            foundInRedis = true;
            redisUtil.del(key);
        }

        bookRepository.reduceStorage(bookId, num);
        if (foundInRedis && book != null) {
            book.setStorage(book.getStorage() - num);
            redisUtil.set(
                    "book:" + bookId + ":" + book.getBookName(),
                    JSONArray.toJSON(book)
            );
        }
        return true;
    }
}
