package com.swh.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "books")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "bookId")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookId;

    private Integer ISBN;
    private String bookName;
    private String author;
    private String category;
    private Integer price;
    private String intro;
    private Integer storage;
    private String image;

    public Book(OrderItem orderItem) {
        this.bookId = orderItem.getBookId();
        this.bookName = orderItem.getBookName();
        this.author = orderItem.getAuthor();
        this.category = orderItem.getCategory();
        this.price = orderItem.getBookPrice();
        this.image = orderItem.getImage();
    }

    public Book() {}
}
