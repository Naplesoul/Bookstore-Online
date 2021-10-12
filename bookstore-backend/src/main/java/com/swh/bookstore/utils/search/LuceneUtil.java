package com.swh.bookstore.utils.search;

import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.dao.BookDao;
import com.swh.bookstore.entity.Book;
import com.swh.bookstore.utils.dto.SimplifiedBook;
import com.swh.bookstore.utils.dto.SimplifiedBookImpl;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.*;
import org.apache.lucene.queryparser.classic.MultiFieldQueryParser;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class LuceneUtil {

    @Autowired
    private BookDao bookDao;

    public void createBookIndex() {
        try {
            List<Book> bookList = bookDao.getBooks();

            Collection<Document> docs = new ArrayList<>();
            for (Book book : bookList) {
                Document doc = new Document();
                doc.add(new StringField(Constant.BOOK_ID, book.getBookId().toString(), Field.Store.YES));
                doc.add(new StringField(Constant.PRICE, book.getPrice().toString(), Field.Store.YES));
                doc.add(new TextField(Constant.BOOK_NAME, book.getBookName(), Field.Store.YES));
                doc.add(new TextField(Constant.AUTHOR, book.getAuthor(), Field.Store.YES));
                doc.add(new TextField(Constant.CATEGORY, book.getCategory(), Field.Store.YES));
                doc.add(new TextField(Constant.INTRO, book.getIntro(), Field.Store.YES));

                docs.add(doc);
            }
            Directory directory = FSDirectory.open(FileSystems.getDefault().getPath(Constant.INDEX_DIR));
            Analyzer analyzer = new ChineseAnalyzer();

            IndexWriterConfig config = new IndexWriterConfig(analyzer);
            config.setOpenMode(IndexWriterConfig.OpenMode.CREATE);
            IndexWriter indexWriter = new IndexWriter(directory, config);
            indexWriter.addDocuments(docs);
            indexWriter.commit();
            indexWriter.close();
        } catch (IOException e) {
            System.out.println("Lucene: IO异常 于 建立索引");
        } catch (Exception e) {
            System.out.println("Lucene: 未知异常 于 建立索引");
            e.printStackTrace();
        }
    }

    public void updateBookIndex(Integer bookId) {
        try {
            Book book = bookDao.getBookByBookId(bookId);
            if (book != null) {
                Document doc = new Document();
                doc.add(new StringField(Constant.BOOK_ID, book.getBookId().toString(), Field.Store.YES));
                doc.add(new StringField(Constant.PRICE, book.getPrice().toString(), Field.Store.YES));
                doc.add(new TextField(Constant.BOOK_NAME, book.getBookName(), Field.Store.YES));
                doc.add(new TextField(Constant.AUTHOR, book.getAuthor(), Field.Store.YES));
                doc.add(new TextField(Constant.CATEGORY, book.getCategory(), Field.Store.YES));
                doc.add(new TextField(Constant.INTRO, book.getIntro(), Field.Store.YES));

                Directory directory = FSDirectory.open(FileSystems.getDefault().getPath(Constant.INDEX_DIR));
                Analyzer analyzer = new ChineseAnalyzer();

                IndexWriterConfig config = new IndexWriterConfig(analyzer);
                IndexWriter indexWriter = new IndexWriter(directory, config);
                indexWriter.updateDocument(new Term(Constant.BOOK_ID, bookId.toString()), doc);
                indexWriter.commit();
                indexWriter.close();
            }
        } catch (IOException e) {
            System.out.println("Lucene: IO异常 于 更新索引");
        } catch (Exception e) {
            System.out.println("Lucene: 未知异常 于 更新索引");
            e.printStackTrace();
        }
    }

    public void addBookIndex(Integer bookId) {
        try {
            Book book = bookDao.getBookByBookId(bookId);
            if (book != null) {
                Document doc = new Document();
                doc.add(new StringField(Constant.BOOK_ID, book.getBookId().toString(), Field.Store.YES));
                doc.add(new StringField(Constant.PRICE, book.getPrice().toString(), Field.Store.YES));
                doc.add(new TextField(Constant.BOOK_NAME, book.getBookName(), Field.Store.YES));
                doc.add(new TextField(Constant.AUTHOR, book.getAuthor(), Field.Store.YES));
                doc.add(new TextField(Constant.CATEGORY, book.getCategory(), Field.Store.YES));
                doc.add(new TextField(Constant.INTRO, book.getIntro(), Field.Store.YES));

                Directory directory = FSDirectory.open(FileSystems.getDefault().getPath(Constant.INDEX_DIR));
                Analyzer analyzer = new ChineseAnalyzer();

                IndexWriterConfig config = new IndexWriterConfig(analyzer);
                IndexWriter indexWriter = new IndexWriter(directory, config);
                indexWriter.addDocument(doc);
                indexWriter.commit();
                indexWriter.close();
            }
        } catch (IOException e) {
            System.out.println("Lucene: IO异常 于 更新索引");
        } catch (Exception e) {
            System.out.println("Lucene: 未知异常 于 更新索引");
            e.printStackTrace();
        }
    }

    public void deleteBookIndex(Integer bookId) {
        try {
            Directory directory = FSDirectory.open(FileSystems.getDefault().getPath(Constant.INDEX_DIR));
            Analyzer analyzer = new ChineseAnalyzer();

            IndexWriterConfig config = new IndexWriterConfig(analyzer);
            IndexWriter indexWriter = new IndexWriter(directory, config);
            indexWriter.deleteDocuments(new Term(Constant.BOOK_ID, bookId.toString()));
            indexWriter.commit();
            indexWriter.close();
        } catch (IOException e) {
            System.out.println("Lucene: IO异常 于 删除索引");
        } catch (Exception e) {
            System.out.println("Lucene: 未知异常 于 删除索引");
            e.printStackTrace();
        }
    }


    /**
     * 根据搜索书（包括书名、作者、分类）
     *
     * @param results 写入的结果引用（仅分页部分）
     * @return 查找结果总数
     */
    public Integer searchBook(Integer page, Integer size, String searchText, List<SimplifiedBook> results) {
        try {
            int begin = (page - 1) * size;
            int end = begin + size;

            Directory directory = FSDirectory.open(FileSystems.getDefault().getPath(Constant.INDEX_DIR));
            // 索引读取工具
            IndexReader reader = DirectoryReader.open(directory);
            // 索引搜索工具
            IndexSearcher searcher = new IndexSearcher(reader);
            // 创建查询解析器,两个参数：默认要查询的字段的名称，分词器
            String[] fields = {Constant.BOOK_NAME, Constant.AUTHOR, Constant.CATEGORY};
            QueryParser parser = new MultiFieldQueryParser(fields, new ChineseAnalyzer());
            // 创建查询对象
            Query query = parser.parse(searchText);
            // 获取前十条记录
            TopDocs topDocs = searcher.search(query, 10);
            ScoreDoc[] scoreDocs = topDocs.scoreDocs;
            end = Math.min(end, scoreDocs.length);

            for (int i = begin; i < end; ++i) {
                int docID = scoreDocs[i].doc;
                // 根据编号去找文档
                Document doc = reader.document(docID);
                SimplifiedBookImpl spfBook = new SimplifiedBookImpl(
                        Integer.parseInt(doc.get(Constant.BOOK_ID)),
                        Integer.parseInt(doc.get(Constant.PRICE)),
                        doc.get(Constant.BOOK_NAME)
                );
                results.add(spfBook);
            }
            return scoreDocs.length;
        } catch (IOException e) {
            System.out.println("Lucene: IO异常 于 查找索引");
        } catch (ParseException e) {
            System.out.println("Lucene: 解析异常 于 查找索引");
        } catch (Exception e) {
            System.out.println("Lucene: 未知异常 于 查找索引");
            e.printStackTrace();
        }
        return null;
    }

    private Integer searchBook(Integer page, Integer size,
                                            String searchText, String searchType,
                                            List<SimplifiedBook> results) {
        try {
            int begin = (page - 1) * size;
            int end = begin + size;

            Directory directory = FSDirectory.open(FileSystems.getDefault().getPath(Constant.INDEX_DIR));
            // 索引读取工具
            IndexReader reader = DirectoryReader.open(directory);
            // 索引搜索工具
            IndexSearcher searcher = new IndexSearcher(reader);
            // 创建查询解析器,两个参数：默认要查询的字段的名称，分词器
            QueryParser parser = new QueryParser(searchType, new ChineseAnalyzer());
            // 创建查询对象
            Query query = parser.parse(searchText);
            // 获取前十条记录
            TopDocs topDocs = searcher.search(query, 10);
            ScoreDoc[] scoreDocs = topDocs.scoreDocs;
            end = Math.min(end, scoreDocs.length);

            for (int i = begin; i < end; ++i) {
                int docID = scoreDocs[i].doc;
                // 根据编号去找文档
                Document doc = reader.document(docID);
                SimplifiedBookImpl spfBook = new SimplifiedBookImpl(
                        Integer.parseInt(doc.get(Constant.BOOK_ID)),
                        Integer.parseInt(doc.get(Constant.PRICE)),
                        doc.get(Constant.BOOK_NAME)
                );
                results.add(spfBook);
            }
            return scoreDocs.length;
        } catch (IOException e) {
            System.out.println("Lucene: IO异常 于 查找索引");
        } catch (ParseException e) {
            System.out.println("Lucene: 解析异常 于 查找索引");
        } catch (Exception e) {
            System.out.println("Lucene: 未知异常 于 查找索引");
            e.printStackTrace();
        }
        return null;
    }

    public Integer searchBookName(Integer page, Integer size,
                                  String searchText, List<SimplifiedBook> results) {
        return searchBook(page, size, Constant.BOOK_NAME, searchText, results);
    }

    public Integer searchAuthor(Integer page, Integer size,
                                String searchText, List<SimplifiedBook> results) {
        return searchBook(page, size, Constant.AUTHOR, searchText, results);
    }

    public Integer searchCategory(Integer page, Integer size,
                                  String searchText, List<SimplifiedBook> results) {
        return searchBook(page, size, Constant.CATEGORY, searchText, results);
    }

    public Integer searchIntro(Integer page, Integer size,
                               String searchText, List<SimplifiedBook> results) {
        return searchBook(page, size, Constant.INTRO, searchText, results);
    }
}
