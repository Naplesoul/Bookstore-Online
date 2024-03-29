package com.swh.bookstore.serviceimpl;

import com.swh.bookstore.dao.BookDao;
import com.swh.bookstore.entity.Book;
import com.swh.bookstore.repository.BookIntroRepository;
import com.swh.bookstore.service.BookService;
import com.swh.bookstore.utils.dto.SimplifiedBook;
import com.swh.bookstore.utils.search.LuceneUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Autowired
    private LuceneUtil luceneUtil;

    @Override
    public Book getBookByBookId(Integer bookId) {
        return bookDao.getBookByBookId(bookId);
    }

    @Override
    public Page<SimplifiedBook> getBooks(Integer page, Integer size) {
        return bookDao.getBooks(page, size);
    }

    @Override
    public Page<SimplifiedBook> searchBooks(Integer page, Integer size, String searchText) {
        List<SimplifiedBook> resultList = new ArrayList<>();
        Integer totalResultsCount = luceneUtil.searchBook(page, size, searchText, resultList);
        if (totalResultsCount == null) {
            return new PageImpl<>(resultList);
        }
        Pageable pageable = PageRequest.of(page - 1, size);
        return new PageImpl<>(resultList, pageable, totalResultsCount);
    }

    @Override
    public Page<SimplifiedBook> searchBooksByIntro(Integer page, Integer size, String searchText) {
        List<SimplifiedBook> resultList = new ArrayList<>();
        Integer totalResultsCount = luceneUtil.searchIntro(page, size, searchText, resultList);
        if (totalResultsCount == null) {
            return new PageImpl<>(resultList);
        }
        Pageable pageable = PageRequest.of(page - 1, size);
        return new PageImpl<>(resultList, pageable, totalResultsCount);
    }

    @Override
    public List<SimplifiedBook> searchAllBooksByIntro(String searchText) {
        return luceneUtil.searchIntro(searchText);
    }

    @Override
    public Boolean setBookLabels(Integer bookId, List<String> labels) {
        return bookDao.setBookLabels(bookId, labels);
    }

    @Override
    public List<SimplifiedBook> searchRelatedBooksByLabel(String label) {
        return bookDao.getRelatedBooksByLabel(label);
    }
    @Override
    public Page<Book> filterBooks(Book book, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        List<Book> books = new ArrayList<>();
        if (book.getBookId() != null) {
            Book found = bookDao.getBookByBookId(book.getBookId());
            if (found != null) {
                books.add(found);
                return new PageImpl<>(books, pageable, 1);
            }
            return new PageImpl<>(books, pageable, 0);
        }
        if (book.getISBN() != null) {
            Book found = bookDao.getBookByISBN(book.getISBN());
            if (found != null) {
                books.add(found);
                return new PageImpl<>(books, pageable, 1);
            }
            return new PageImpl<>(books, pageable, 0);
        }
        if (book.getPrice() != null) {
            return bookDao.getBookByPrice(book.getPrice(), page, size);
        }
        if (book.getStorage() != null) {
            return bookDao.getBookByStorage(book.getStorage(), page, size);
        }
        if (book.getIntro() != null && book.getIntro().trim().length() > 0) {
            List<Book> result = new ArrayList<>();
            Page<SimplifiedBook> simplifiedBooks = searchBooksByIntro(page, size, book.getIntro());
            for (SimplifiedBook simplifiedBook : simplifiedBooks) {
                result.add(bookDao.getBookByBookId(simplifiedBook.getBookId()));
            }
            return new PageImpl<>(result, pageable, simplifiedBooks.getTotalElements());
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

        return bookDao.filterBooks(book.getBookName(), book.getCategory(), book.getAuthor(), page, size);
    }

    @Override
    @Transactional(isolation = Isolation.REPEATABLE_READ, rollbackFor = Exception.class)
    public Boolean setBook(Book book) {
        Boolean result = bookDao.setBook(book);
        if (result) {
            luceneUtil.updateBookIndex(book.getBookId());
        }
        return result;
    }

    @Override
    @Transactional(isolation = Isolation.REPEATABLE_READ, rollbackFor = Exception.class)
    public Boolean deleteBook(Integer bookId) {
        Boolean result = bookDao.deleteBook(bookId);
        if (result) {
            luceneUtil.deleteBookIndex(bookId);
        }
        return result;
    }

    @Override public Integer addBook(Book book) {
        Integer result = bookDao.addBook(book);
        if (result != null && result > 0) {
            luceneUtil.addBookIndex(result);
        }
        return result;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean setBookImage(Integer bookId, String base64Image) {
        return bookDao.setBookImage(bookId, base64Image);
    }

    @Override
    public BufferedImage getBookImage(Integer bookId) {
        return bookDao.getBookImage(bookId);
    }
}
