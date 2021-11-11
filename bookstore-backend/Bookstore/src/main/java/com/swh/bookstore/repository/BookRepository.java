package com.swh.bookstore.repository;

import com.swh.bookstore.entity.Book;
import com.swh.bookstore.utils.dto.SimplifiedBook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface BookRepository extends JpaRepository<Book, Integer> {


    List<Book> findAll();
    Page<SimplifiedBook> findSimplifiedBooksBy(Pageable pageable);

    Page<Book> findBookByPrice(Integer price, Pageable pageable);
    Page<Book> findBookByStorage(Integer storage, Pageable pageable);

    Book findBookByBookId(Integer bookId);
    Book findBookByISBN(Integer ISBN);

    @Query("from Book b where b.bookName like :bookName and b.category like :category " +
            "and b.author like :author")
    Page<Book> filterBooks(String bookName, String category, String author, Pageable pageable);

    @Modifying
    @Query("update Book b set b.ISBN = :ISBN, b.bookName = :bookName, b.category = :category, b.author = :author," +
            "b.price = :price, b.storage = :storage where b.bookId = :bookId")
    void setBook(Integer bookId, Integer ISBN, String bookName, String category, String author,
                 Integer price, Integer storage);

    @Modifying
    @Query("update Book b set b.storage = b.storage - :num where b.bookId = :bookId")
    void reduceStorage(Integer bookId, Integer num);

    @Modifying
    void deleteBookByBookId(Integer bookId);

//    @Modifying
//    @Query("update Book b set b.image = :base64Image where b.bookId = :bookId")
//    void setBookImage(Integer bookId, String base64Image);

//    BookImage findBookImageByBookId(Integer bookId);
}
