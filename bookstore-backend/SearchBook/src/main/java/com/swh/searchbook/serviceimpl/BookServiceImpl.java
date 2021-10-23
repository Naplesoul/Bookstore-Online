package com.swh.searchbook.serviceimpl;

import com.swh.searchbook.dao.BookDao;
import com.swh.searchbook.entity.Book;
import com.swh.searchbook.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public String getAuthorByBookName(String bookName) {
        Book book = bookDao.getBookByBookName(bookName);
        if (book == null) {
            return "此书不存在";
        } else {
            return book.getAuthor();
        }
    }
}
