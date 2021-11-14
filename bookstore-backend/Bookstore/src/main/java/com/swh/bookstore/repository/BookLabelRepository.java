package com.swh.bookstore.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import com.swh.bookstore.entity.BookLabel;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;

public interface BookLabelRepository extends Neo4jRepository<BookLabel, Long> {

    BookLabel findByLabel(String label);

    @Query("MATCH (start:BookLabel)-[:appear_in_one_book*0..2]-(found:BookLabel) " +
            "WHERE start.label=$label RETURN DISTINCT found")
    List<BookLabel> findByRelatedLabel(String label);
}
