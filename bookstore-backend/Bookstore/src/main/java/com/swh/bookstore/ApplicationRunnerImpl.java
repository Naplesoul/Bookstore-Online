package com.swh.bookstore;

import com.swh.bookstore.utils.search.LuceneUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class ApplicationRunnerImpl implements ApplicationRunner {
    @Autowired
    LuceneUtil luceneUtil;

    @Override
    public void run(ApplicationArguments args) {
        luceneUtil.createBookIndex();
    }
}
