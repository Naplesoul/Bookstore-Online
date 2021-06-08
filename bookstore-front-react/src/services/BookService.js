import {config} from "../config";
import {getRequest, postRequest} from "../utils/ajax";

export const getBooks = (callback) => {
    const url = `${config.apiUrl}/getBooks`;
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
