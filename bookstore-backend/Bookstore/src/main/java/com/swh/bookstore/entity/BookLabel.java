package com.swh.bookstore.entity;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Node
public class BookLabel {
    @Id
    @GeneratedValue
    private Long id;
    private String label;
    private Set<Integer> bookIds;

    @Relationship(type = "appear_in_one_book")
    public Set<BookLabel> relatedBookLabels;

    private BookLabel() {
        bookIds = new HashSet<>();
        this.relatedBookLabels = new HashSet<>();
    }

    public BookLabel(String label) {
        this.label = label;
        this.bookIds = new HashSet<>();
        this.relatedBookLabels = new HashSet<>();
    }

    public Long getId() {
        return id;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public void addBookId(Integer id) {
        bookIds.add(id);
    }

    public Set<Integer> getBookIds() {
        return bookIds;
    }

    public void addRelation(BookLabel bookLabel) {
        relatedBookLabels.add(bookLabel);
    }

    public void addRelations(List<BookLabel> bookLabels) {
        for (BookLabel bookLabel : bookLabels) {
            if (!id.equals(bookLabel.getId())) {
                relatedBookLabels.add(bookLabel);
            }
        }
    }
}
