package com.swh.searchbook.repository;

import com.swh.searchbook.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BookRepository extends JpaRepository<Book, Integer> {

    Book findBookByBookName(String bookName);
}
