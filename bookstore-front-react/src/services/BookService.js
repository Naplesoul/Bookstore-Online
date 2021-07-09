import {config} from "../config";
import {getRequest, postRequest} from "../utils/ajax";

export const getBooks = (page, size, searchType, searchText, callback) => {
    if (searchText == null) {
        searchText = "";
    }
    const url = `${config.apiUrl}/getBooks?page=` + page.toString() + "&size="
        + size.toString() + "&searchType=" + searchType.toString() + "&searchText=" + searchText.trim();
    getRequest(url, callback);
};

export const filterBooks = (page, size, book, callback) => {
    const url = `${config.apiUrl}/filterBooks?page=` + page.toString() + "&size=" + size.toString();
    postRequest(url, book, callback);
};

export const getBook = (bookId, callback) => {
    const url = `${config.apiUrl}/getBook?bookId=` + bookId.toString();
    getRequest(url, callback);
};

export const addBook = (bookData, callback) => {
    const url = `${config.apiUrl}/addBook`;
    postRequest(url, bookData, callback);
};

export const setBook = (_userId, _book, callback) => {
    const url = `${config.apiUrl}/setBook`;
    let form = {
        userId: _userId,
        book: _book,
    };
    postRequest(url, form, callback);
}

export const deleteBook = (_userId, _bookId, callback) => {
    const url = `${config.apiUrl}/deleteBook`;
    let form = {
        userId: _userId,
        bookId: _bookId,
    };
    postRequest(url, form, callback);
}

export const setBookImage = (bookId, image, callback) => {
    const url = `${config.apiUrl}/setBookImage?bookId=` + bookId.toString();
    let form = {
        image: image.split(',')[1],
    };
    postRequest(url, form, callback);
}
