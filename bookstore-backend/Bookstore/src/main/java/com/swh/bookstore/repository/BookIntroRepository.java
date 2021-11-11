package com.swh.bookstore.repository;

import com.swh.bookstore.entity.BookIntro;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookIntroRepository extends MongoRepository<BookIntro, Integer> {
}
