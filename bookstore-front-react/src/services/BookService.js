import {config} from "../config";
import {getRequest, postRequest} from "../utils/ajax";

export const getBooks = (page, size, searchText, callback) => {
    if (searchText == null) {
        searchText = "";
    }
    const url = `${config.apiUrl}/getBooks?page=` + page.toString() + "&size=" + size.toString() + "&searchText=" + searchText;
    getRequest(url, callback);
};

export const getBook = (bookId, callback) => {
    const url = `${config.apiUrl}/getBook?bookId=` + bookId.toString();
    getRequest(url, callback);
};

export const getBookCount = (callback) => {
    const url = `${config.apiUrl}/getBookCount`;
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
