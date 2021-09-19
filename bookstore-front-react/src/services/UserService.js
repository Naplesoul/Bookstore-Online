import {config} from "../config";
import {getRequest, postRequest} from "../utils/ajax";

export const login = (_username, _password, callback) => {
    const url = `${config.apiUrl}/login`;
    let loginForm = {
        username: _username,
        password: _password,
        // username: "shenwhang",
        // password: "801616"
    };
    postRequest(url, loginForm, callback);
}

export const autoLogin = (callback) => {
    const url = `${config.apiUrl}/autoLogin`;
    getRequest(url, callback);
}

export const logout = (callback) => {
    const url = `${config.apiUrl}/logout`;
    getRequest(url, callback);
}

export const signup = (_username, _password, _email, callback) => {
    const url = `${config.apiUrl}/signup`;
    let signupForm = {
        username: _username,
        password: _password,
        email: _email,
    };
    postRequest(url, signupForm, callback);
}

export const getUsers = (callback) => {
    const url = `${config.apiUrl}/getUsers`;
    getRequest(url, callback);
}

export const setUserType = (_targetUserId, _targetUserType, callback) => {
    const url = `${config.apiUrl}/setUserType`;
    let form = {
        targetUserId: _targetUserId,
        targetUserType: _targetUserType,
    };
    postRequest(url, form, callback);
}

export const getDuplicateUsername = (_username, callback) => {
    const url = `${config.apiUrl}/getDuplicateUsername?username=` + _username;
    getRequest(url, callback);
}
