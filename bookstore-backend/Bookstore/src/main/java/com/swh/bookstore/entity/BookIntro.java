package com.swh.bookstore.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookIntro")
public class BookIntro {
    @Id
    private int id;

    private String intro;

    public BookIntro(int id, String intro) {
        this.id = id;
        this.intro = intro;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }
}
