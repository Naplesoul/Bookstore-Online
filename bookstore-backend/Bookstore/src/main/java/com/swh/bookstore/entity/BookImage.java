package com.swh.bookstore.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookImage")
public class BookImage {
    @Id
    private int id;

    private String base64;

    public BookImage(int id, String base64) {
        this.id = id;
        this.base64 = base64;
    }

    public String getBase64() {
        return base64;
    }

    public void setBase64(String base64) {
        this.base64 = base64;
    }
}
