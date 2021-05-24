package com.mybookstore.bookstore.repository;

import com.mybookstore.bookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query("select b from Book b")
    List<Book> getBooks();

    @Modifying
    @Query("update Book b set b.name = :name, b.category = :category, b.author = :author," +
            "b.price = :price, b.intro = :intro, b.storage = :storage, b.image = :image where b.id = :id")
    void setBook(@Param("id") Integer id, @Param("name") String name,
                    @Param("category") String category, @Param("author") String author,
                    @Param("price") Integer price, @Param("intro") String intro,
                    @Param("storage") Integer storage, @Param("image") String image);

    @Modifying
    @Query("update Book b set b.storage = b.storage - :num where b.id = :id")
    void reduceStorage(Integer id, Integer num);
}
