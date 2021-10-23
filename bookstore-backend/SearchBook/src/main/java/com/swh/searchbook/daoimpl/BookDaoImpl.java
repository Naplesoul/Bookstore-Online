package com.swh.searchbook.daoimpl;

import com.alibaba.fastjson.JSONArray;
import com.swh.searchbook.dao.BookDao;
import com.swh.searchbook.entity.Book;
import com.swh.searchbook.repository.BookRepository;
import com.swh.searchbook.utils.cache.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
    public Book getBookByBookName(String bookName) {
        Set<String> keys = redisUtil.keys("book:*:" + bookName);
        for (String key : keys) {
            return JSONArray.parseObject(redisUtil.get(key).toString(), Book.class);
        }

        Book book = bookRepository.findBookByBookName(bookName);

        if (book != null) {
            book.setImage(null);
            redisUtil.set(
                    "book:" + book.getBookId() + ":" + book.getBookName(),
                    JSONArray.toJSON(book)
            );
        }

        return book;
    }
}
