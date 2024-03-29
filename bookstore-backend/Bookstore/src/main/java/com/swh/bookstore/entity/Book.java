package com.swh.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

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

    @JsonProperty("ISBN")
    private Integer ISBN;
    private String bookName;
    private String author;
    private String category;
    private Integer price;
    private Integer storage;

    @Transient
    private String intro;

//    @Basic(fetch = FetchType.LAZY)
//    @LazyCollection(LazyCollectionOption.TRUE)
//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
//    private String image;
}
