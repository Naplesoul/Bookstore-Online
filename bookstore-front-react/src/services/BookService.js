import {config} from "../config";
import {getRequest} from "../utils/ajax";

export const getBooks = (callback) => {
    const url = `${config.apiUrl}/getBooks`;
    getRequest(url, callback);
};
