package com.swh.bookstore.controller;

import com.alibaba.fastjson.JSONObject;
import com.swh.bookstore.constant.Constant;
import com.swh.bookstore.entity.Book;
import com.swh.bookstore.service.BookService;
import com.swh.bookstore.utils.objects.SimplifiedBook;
import com.swh.bookstore.utils.session.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.awt.image.BufferedImage;
import java.util.Map;

@CrossOrigin
@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping("/getBooks")
    public Page<SimplifiedBook> getBooks(@RequestParam(Constant.PAGE) Integer page,
                                         @RequestParam(Constant.SIZE) Integer size,
                                         @RequestParam(Constant.SEARCH_TEXT) String searchText) {
        return bookService.getSimplifiedBooks(page, size, searchText);
    }

    @RequestMapping("/filterBooks")
    Page<Book> filterBooks(@RequestParam(Constant.PAGE) Integer page,
                           @RequestParam(Constant.SIZE) Integer size,
                           @RequestBody Book book) {
        return bookService.filterBooks(book, page, size);
    }

    @RequestMapping("/getBook")
    public Book getBookByBookId(@RequestParam(Constant.BOOK_ID) Integer bookId) {
        return bookService.getBookByBookId(bookId);
    }

    @RequestMapping("/setBook")
    public Boolean setBook(@RequestBody JSONObject params) {
        try {
            if (!SessionUtil.isAdmin()) {
                System.out.println("User unauthorized");
                return false;
            }
            JSONObject bookJson = params.getJSONObject(Constant.BOOK);
            Book book = bookJson.toJavaObject(Book.class);
            return bookService.setBook(book);
        } catch (Exception e) {
            System.out.println("Caught an exception in setBook");
            e.printStackTrace();
            return false;
        }
    }

    @RequestMapping("/deleteBook")
        public Boolean deleteBook(@RequestBody Map<String, Integer> params) {
        try {
            if (!SessionUtil.isAdmin()) {
                System.out.println("User unauthorized");
                return false;
            }
            return bookService.deleteBook(params.get(Constant.BOOK_ID));
        } catch (Exception e) {
            System.out.println("Caught an exception in deleteBook");
            e.printStackTrace();
            return false;
        }
    }

    @RequestMapping("/addBook")
    public Integer addBook(@RequestBody Book book) {
        if (!SessionUtil.isAdmin()) {
            System.out.println("User unauthorized");
            return -1;
        }
        return bookService.addBook(book);
    }

    @RequestMapping("/setBookImage")
    public Boolean setBookImage(@RequestParam(Constant.BOOK_ID) Integer bookId,
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

    @RequestMapping(value = "/getBookImage", produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public BufferedImage getBookImage(@RequestParam(Constant.BOOK_ID) Integer bookId) {
        return bookService.getBookImage(bookId);
    }
}
