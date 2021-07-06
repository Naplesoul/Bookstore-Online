package com.swh.bookstore.repository;

import com.swh.bookstore.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;



public interface BookRepository extends JpaRepository<Book, Integer> {

    Page<Book> findAll(Pageable pageable);

    Page<Book> findByBookNameLike(String searchText, Pageable pageable);
    Page<Book> findByCategoryLike(String searchText, Pageable pageable);
    Page<Book> findByAuthorLike(String searchText, Pageable pageable);
    Page<Book> findByIntroLike(String searchText, Pageable pageable);
    Page<Book> findByImageLike(String searchText, Pageable pageable);

    Page<Book> findBookByBookId(Integer bookId, Pageable pageable);
    Page<Book> findBookByISBN(Integer ISBN, Pageable pageable);
    Page<Book> findBookByPrice(Integer price, Pageable pageable);
    Page<Book> findBookByStorage(Integer storage, Pageable pageable);

    Book findBookByBookId(Integer bookId);
    Book findBookByISBN(Integer ISBN);

    @Query("from Book b where b.bookName like :bookName and b.category like :category " +
    "and b.author like :author and b.intro like :intro and b.image like :image")
    Page<Book> filterBooks(String bookName, String category, String author,
                           String intro, String image, Pageable pageable);

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
