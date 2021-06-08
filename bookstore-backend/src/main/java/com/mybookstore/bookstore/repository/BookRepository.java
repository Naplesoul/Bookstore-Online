package com.mybookstore.bookstore.repository;

import com.mybookstore.bookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {

    List<Book> findAll();

    Book findBookByBookId(Integer bookId);
    Book findBookByISBN(Integer ISBN);

    @Modifying
    @Transactional
    @Query("update Book b set b.ISBN = :ISBN, b.bookName = :bookName, b.category = :category, b.author = :author," +
            "b.price = :price, b.intro = :intro, b.storage = :storage, b.image = :image where b.bookId = :bookId")
    void setBook(@Param("bookId") Integer bookId, @Param("ISBN") Integer ISBN, @Param("bookName") String bookName,
                    @Param("category") String category, @Param("author") String author,
                    @Param("price") Integer price, @Param("intro") String intro,
                    @Param("storage") Integer storage, @Param("image") String image);

    @Modifying
    @Transactional
    @Query("update Book b set b.storage = b.storage - :num where b.bookId = :bookId")
    void reduceStorage(Integer bookId, Integer num);

    @Modifying
    @Transactional
    void deleteBookByBookId(Integer bookId);
}
