import {config} from "../config";
import {deleteRequest, getRequest, postRequest, putRequest} from "../utils/ajax";

export const getBooks = (page, size, searchText, callback) => {
    let url;
    if (searchText == null) {
        url = `${config.apiUrl}/books?page=${page.toString()}&size=${size.toString()}`;
    } else {
        url = `${config.apiUrl}/books?page=${page.toString()}&size=${size.toString()}&searchText=${searchText.trim()}`;
    }
    getRequest(url, callback);
};

export const filterBooks = (page, size, book, callback) => {
    const url = `${config.apiUrl}/admin/books?page=${page.toString()}&size=${size.toString()}`
        + `&bookId=${book.bookId ? book.bookId.toString() : ""}&ISBN=${book.ISBN ? book.ISBN.toString() : ""}`
        + `&bookName=${book.bookName ? book.bookName : ""}&author=${book.author ? book.author : ""}`
        + `&category=${book.category ? book.category : ""}&price=${book.price ? book.price.toString() : ""}`
        + `&storage=${book.storage ? book.storage.toString() : ""}&intro=${book.intro ? book.intro : ""}`
    getRequest(url, callback);
};

export const getBook = (bookId, callback) => {
    const url = `${config.apiUrl}/book/${bookId.toString()}`;
    getRequest(url, callback);
};

export const addBook = (bookData, callback) => {
    const url = `${config.apiUrl}/admin/book`;
    postRequest(url, bookData, callback);
};

export const setBook = (_book, callback) => {
    const url = `${config.apiUrl}/admin/book`;
    let form = {
        book: _book,
    };
    putRequest(url, form, callback);
}

export const deleteBook = (_bookId, callback) => {
    const url = `${config.apiUrl}/admin/book/${_bookId.toString()}`;
    deleteRequest(url, callback);
}

export const setBookImage = (bookId, image, callback) => {
    const url = `${config.apiUrl}/admin/bookImage/${bookId.toString()}`;
    let form = {
        image: image.split(',')[1],
    };
    putRequest(url, form, callback);
}
