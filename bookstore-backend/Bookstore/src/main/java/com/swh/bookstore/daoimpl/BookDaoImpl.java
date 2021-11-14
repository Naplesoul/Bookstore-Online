package com.swh.bookstore.daoimpl;

import cn.hutool.core.img.ImgUtil;
import com.alibaba.fastjson.JSONArray;
import com.swh.bookstore.dao.BookDao;
import com.swh.bookstore.entity.Book;
import com.swh.bookstore.entity.BookImage;
import com.swh.bookstore.entity.BookIntro;
import com.swh.bookstore.entity.BookLabel;
import com.swh.bookstore.repository.BookImageRepository;
import com.swh.bookstore.repository.BookIntroRepository;
import com.swh.bookstore.repository.BookLabelRepository;
import com.swh.bookstore.repository.BookRepository;
import com.swh.bookstore.utils.cache.RedisUtil;
import com.swh.bookstore.utils.dto.SimplifiedBook;
import com.swh.bookstore.utils.dto.SimplifiedBookImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.awt.image.BufferedImage;
import java.util.*;


@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepository;

    // key pattern: book:bookId:bookName
    // key for image: bookImage:bookId
    @Autowired
    RedisUtil redisUtil;

    @Autowired
    BookImageRepository bookImageRepository;

    @Autowired
    BookIntroRepository bookIntroRepository;

    @Autowired
    BookLabelRepository bookLabelRepository;

    @Override
    public Book getBookByBookId(Integer bookId) {
        Set<String> keys = redisUtil.keys("book:" + bookId + ":*");
        for (String key : keys) {
            return JSONArray.parseObject(redisUtil.get(key).toString(), Book.class);
        }

        Book book = bookRepository.findBookByBookId(bookId);
        Optional<BookIntro> bookIntro = bookIntroRepository.findById(bookId);
        bookIntro.ifPresent(intro -> book.setIntro(intro.getIntro()));

        if (book != null) {
//            book.setImage(null);
            redisUtil.set(
                    "book:" + bookId + ":" + book.getBookName(),
                    JSONArray.toJSON(book)
            );
        }

        return book;
    }

    @Override
    public Book getBookByISBN(Integer bookId) {
        Book book = bookRepository.findBookByBookId(bookId);
        Optional<BookIntro> bookIntro = bookIntroRepository.findById(bookId);
        bookIntro.ifPresent(intro -> book.setIntro(intro.getIntro()));
        return book;
    }

    @Override
    public Page<Book> getBookByPrice(Integer price, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Book> books = bookRepository.findBookByPrice(price, pageable);
        for (Book book : books) {
            Optional<BookIntro> bookIntro = bookIntroRepository.findById(book.getBookId());
            bookIntro.ifPresent(intro -> book.setIntro(intro.getIntro()));
        }
        return books;
    }

    @Override
    public Page<Book> getBookByStorage(Integer storage, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Book> books = bookRepository.findBookByStorage(storage, pageable);
        for (Book book : books) {
            Optional<BookIntro> bookIntro = bookIntroRepository.findById(book.getBookId());
            bookIntro.ifPresent(intro -> book.setIntro(intro.getIntro()));
        }
        return books;
    }

    @Override
    public Boolean setBookLabels(Integer bookId, List<String> labels) {
        Book book = getBookByBookId(bookId);
        if (book == null) {
            return false;
        }

        List<BookLabel> bookLabels = new ArrayList<>();

        for (String label : labels) {
            BookLabel bookLabel = bookLabelRepository.findByLabel(label);
            if (bookLabel == null) {
                bookLabel = new BookLabel(label);
                bookLabelRepository.save(bookLabel);
            }
            bookLabels.add(bookLabel);
        }

        if (bookLabels.size() > 0) {
            bookLabels.get(0).addRelations(bookLabels);
        }
        for (BookLabel bookLabel : bookLabels) {
            bookLabel.addBookId(bookId);
            bookLabelRepository.save(bookLabel);
        }

        return true;
    }

    @Override
    public List<SimplifiedBook> getRelatedBooksByLabel(String label) {
        List<BookLabel> bookLabels = bookLabelRepository.findByRelatedLabel(label);
        Set<Integer> resultBookIds = new HashSet<>();
        List<SimplifiedBook> results = new ArrayList<>();

        for (BookLabel bookLabel : bookLabels) {
            resultBookIds.addAll(bookLabel.getBookIds());
        }

        for (Integer bookId : resultBookIds) {
            Book book = getBookByBookId(bookId);
            if (book != null) {
                results.add(new SimplifiedBookImpl(book));
            }
        }

        return results;
    }

    @Override
    public List<Book> getBooks() {
        List<Book> books = bookRepository.findAll();
        for (Book book : books) {
            Optional<BookIntro> bookIntro = bookIntroRepository.findById(book.getBookId());
            bookIntro.ifPresent(intro -> book.setIntro(intro.getIntro()));
        }
        return books;
    }

    @Override
    public Page<SimplifiedBook> getBooks(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return bookRepository.findSimplifiedBooksBy(pageable);
    }

    @Override
    public Page<Book> filterBooks(String bookName, String category, String author,
                                  Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page - 1, size);

        Page<Book> books = bookRepository.filterBooks("%" + bookName + "%", "%" + category + "%",
                "%" + author + "%", pageable);
        for (Book book : books) {
            Optional<BookIntro> bookIntro = bookIntroRepository.findById(book.getBookId());
            bookIntro.ifPresent(intro -> book.setIntro(intro.getIntro()));
        }
        return books;
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
                book.getAuthor(), book.getPrice(), book.getStorage());
        bookIntroRepository.save(new BookIntro(book.getBookId(), book.getIntro()));
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
        bookImageRepository.deleteById(bookId);
        return true;
    }

    @Override
    public Integer addBook(Book book) {
        Book existedBook = bookRepository.findBookByISBN(book.getISBN());
        if (existedBook != null) {
            return -1;
        } else {
            bookRepository.saveAndFlush(book);
            bookIntroRepository.save(new BookIntro(book.getBookId(), book.getIntro()));
            return book.getBookId();
        }
    }

    @Override
    public Boolean setBookImage(Integer bookId, String base64Image) {
        Book book = getBookByBookId(bookId);
        if (book == null) {
            return false;
        }

        Set<String> keys = redisUtil.keys("bookImage:" + bookId);
        for (String key : keys) {
            redisUtil.del(key);
        }

        bookImageRepository.save(new BookImage(bookId, base64Image));
        return true;
    }

    @Override
    public String getBase64BookImage(Integer bookId) {
        try {
            Set<String> keys = redisUtil.keys("bookImage:" + bookId);
            for (String key : keys) {
                return redisUtil.get(key).toString();
            }

            Optional<BookImage> bookImage = bookImageRepository.findById(bookId);
            String base64Image = null;

            if (bookImage.isPresent()) {
                base64Image = bookImage.get().getBase64();
            }

//            String base64Image = bookRepository.findBookImageByBookId(bookId).getImage();

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
            String base64Image = getBase64BookImage(bookId);
            if (base64Image != null)
                return ImgUtil.toImage(base64Image);
            else
                return null;
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
