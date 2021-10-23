package com.swh.searchbook.dao;

import com.swh.searchbook.entity.Book;

public interface BookDao {
    Book getBookByBookName(String bookName);
}
