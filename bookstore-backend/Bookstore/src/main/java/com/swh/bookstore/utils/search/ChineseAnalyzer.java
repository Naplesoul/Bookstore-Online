package com.swh.bookstore.utils.search;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.Tokenizer;

public class ChineseAnalyzer extends Analyzer {
    public ChineseAnalyzer() {}

    @Override
    protected TokenStreamComponents createComponents(String s) {
        Tokenizer cnTokenizer = new ChineseTokenizer(false);
        return new TokenStreamComponents(cnTokenizer);
    }
}
