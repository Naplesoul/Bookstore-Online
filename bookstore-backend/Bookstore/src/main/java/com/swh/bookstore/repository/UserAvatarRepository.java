package com.swh.bookstore.repository;

import com.swh.bookstore.entity.UserAvatar;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserAvatarRepository extends MongoRepository<UserAvatar, Integer> {
}
