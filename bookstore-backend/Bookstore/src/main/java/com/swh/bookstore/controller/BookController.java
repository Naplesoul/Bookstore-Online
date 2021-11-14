package com.swh.bookstore.controller;

import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.entity.Book;
import com.swh.bookstore.service.BookService;
import com.swh.bookstore.utils.dto.SimplifiedBook;
import com.swh.bookstore.utils.session.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import java.awt.image.BufferedImage;
import java.util.List;
import java.util.Map;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/book/{bookId}")
    public Book getBookByBookId(@PathVariable("bookId") Integer bookId) {
        return bookService.getBookByBookId(bookId);
    }

    @PutMapping("/admin/bookImage/{bookId}")
    public Boolean setBookImage(@PathVariable("bookId") Integer bookId,
                                @RequestBody Map<String, String> base64Image) {
        try {
            if (!SessionUtil.isAdmin()) {
                System.out.println("User unauthorized");
                return false;
            }
            return bookService.setBookImage(bookId, base64Image.get(Constant.IMAGE));
        } catch (Exception e) {
            System.out.println("Caught an exception in setBookImage");
            e.printStackTrace();
            return false;
        }
    }

    @GetMapping(value = "/bookImage/{bookId}", produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public BufferedImage getBookImage(@PathVariable("bookId") Integer bookId) {
        return bookService.getBookImage(bookId);
    }


    @GetMapping("/books/{searchIntroText}")
    public List<SimplifiedBook> searchBooksByIntro(@PathVariable("searchIntroText") String text) {
        return bookService.searchAllBooksByIntro(text);
    }

    // 按条件获取书等操作不可避免地要使用请求参数，用get请求没法带request body
    @GetMapping("/books")
    public Page<SimplifiedBook> getBooks(@RequestParam(Constant.PAGE) Integer page,
                                         @RequestParam(Constant.SIZE) Integer size,
                                         @Nullable @RequestParam(Constant.SEARCH_TEXT) String searchText,
                                         @Nullable @RequestParam(Constant.SEARCH_INTRO_TEXT) String searchIntroText) {
        if (searchText != null && (searchText = searchText.trim()).length() > 0) {
            return bookService.searchBooks(page, size, searchText);
        } else if (searchIntroText != null && (searchIntroText = searchIntroText.trim()).length() > 0) {
            return bookService.searchBooksByIntro(page, size, searchIntroText);
        } else {
            return bookService.getBooks(page, size);
        }
    }

    @GetMapping("admin/books")
    Page<Book> filterBooks(@RequestParam(Constant.PAGE) Integer page,
                           @RequestParam(Constant.SIZE) Integer size,
                           @Nullable @RequestParam(Constant.BOOK_ID) Integer bookId,
                           @Nullable @RequestParam(Constant.ISBN) Integer ISBN,
                           @Nullable @RequestParam(Constant.BOOK_NAME) String bookName,
                           @Nullable @RequestParam(Constant.AUTHOR) String author,
                           @Nullable @RequestParam(Constant.CATEGORY) String category,
                           @Nullable @RequestParam(Constant.PRICE) Integer price,
                           @Nullable @RequestParam(Constant.STORAGE) Integer storage,
                           @Nullable @RequestParam(Constant.INTRO) String intro) {
        try {
            if (!SessionUtil.isAdmin()) {
                System.out.println("User unauthorized");
                return null;
            }
            Book book = new Book();
            book.setBookId(bookId);
            book.setISBN(ISBN);
            book.setBookName(bookName);
            book.setAuthor(author);
            book.setCategory(category);
            book.setPrice(price);
            book.setStorage(storage);
            book.setIntro(intro);
            return bookService.filterBooks(book, page, size);
        } catch (Exception e) {
            System.out.println("Caught an exception in setBook");
            e.printStackTrace();
            return null;
        }
    }

    @PutMapping("/admin/book")
    public Boolean setBook(@RequestBody Map<String, Book> params) {
        try {
            if (!SessionUtil.isAdmin()) {
                System.out.println("User unauthorized");
                return false;
            }
            Book book = params.get(Constant.BOOK);
            return bookService.setBook(book);
        } catch (Exception e) {
            System.out.println("Caught an exception in setBook");
            e.printStackTrace();
            return false;
        }
    }

    @DeleteMapping("/admin/book")
        public Boolean deleteBook(@RequestParam(Constant.BOOK_ID) Integer bookId) {
        try {
            if (!SessionUtil.isAdmin()) {
                System.out.println("User unauthorized");
                return false;
            }
            return bookService.deleteBook(bookId);
        } catch (Exception e) {
            System.out.println("Caught an exception in deleteBook");
            e.printStackTrace();
            return false;
        }
    }

    @PostMapping("/admin/book")
    public Integer addBook(@RequestBody Book book) {
        if (!SessionUtil.isAdmin()) {
            System.out.println("User unauthorized");
            return -1;
        }
        return bookService.addBook(book);
    }

    @GetMapping("/label/books/{label}")
    public List<SimplifiedBook> searchRelatedBooksByLabel(@PathVariable("label") String label) {
        return bookService.searchRelatedBooksByLabel(label);
    }

    @PostMapping("/admin/bookLabels/{bookId}")
    public Boolean setBookLabels(@PathVariable("bookId") Integer bookId,
                                 @RequestBody List<String> labels) {
        return bookService.setBookLabels(bookId, labels);
    }
}
