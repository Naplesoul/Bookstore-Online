package com.swh.bookstore.repository;

import com.swh.bookstore.entity.Book;
import com.swh.bookstore.utils.objects.BookImage;
import com.swh.bookstore.utils.objects.SimplifiedBook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;



public interface BookRepository extends JpaRepository<Book, Integer> {

    Page<SimplifiedBook> searchSimplifiedBooksByBookNameContaining(String searchText, Pageable pageable);

    Page<Book> findBookByBookId(Integer bookId, Pageable pageable);
    Page<Book> findBookByISBN(Integer ISBN, Pageable pageable);
    Page<Book> findBookByPrice(Integer price, Pageable pageable);
    Page<Book> findBookByStorage(Integer storage, Pageable pageable);

    Book findBookByBookId(Integer bookId);
    Book findBookByISBN(Integer ISBN);

    @Query("from Book b where b.bookName like :bookName and b.category like :category " +
            "and b.author like :author and b.intro like :intro")
    Page<Book> filterBooks(String bookName, String category, String author,
                           String intro, Pageable pageable);

    @Modifying
    @Query("update Book b set b.ISBN = :ISBN, b.bookName = :bookName, b.category = :category, b.author = :author," +
            "b.price = :price, b.intro = :intro, b.storage = :storage where b.bookId = :bookId")
    void setBook(Integer bookId, Integer ISBN, String bookName, String category, String author,
                 Integer price, String intro, Integer storage);

    @Modifying
    @Query("update Book b set b.storage = b.storage - :num where b.bookId = :bookId")
    void reduceStorage(Integer bookId, Integer num);

    @Modifying
    void deleteBookByBookId(Integer bookId);

    @Modifying
    @Query("update Book b set b.image = :base64Image where b.bookId = :bookId")
    void setBookImage(Integer bookId, String base64Image);

    BookImage findBookImageByBookId(Integer bookId);
}
