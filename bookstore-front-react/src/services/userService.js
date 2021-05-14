import {config} from "../config";
import {postRequest} from "../utils/ajax";

export const login = (_username, _password, callback) => {
    const url = `${config.apiUrl}/login`;
    let loginForm = {
        username: _username,
        password: _password
    }
    postRequest(url, loginForm, callback);
}