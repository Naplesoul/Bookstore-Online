package com.swh.bookstore.repository;

import com.swh.bookstore.entity.BookImage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookImageRepository extends MongoRepository<BookImage, Integer> {
}
