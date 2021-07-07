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

export const signup = (_username, _password, _email, callback) => {
    const url = `${config.apiUrl}/signup`;
    let signupForm = {
        username: _username,
        password: _password,
        email: _email,
    };
    postRequest(url, signupForm, callback);
}

export const getUsers = (_userId, callback) => {
    const url = `${config.apiUrl}/getUsers?userId=` + _userId.toString();
    getRequest(url, callback);
}

export const setUserType = (_userId, _targetUserId, _targetUserType, callback) => {
    const url = `${config.apiUrl}/setUserType`;
    let form = {
        userId: _userId,
        targetUserId: _targetUserId,
        targetUserType: _targetUserType,
    };
    postRequest(url, form, callback);
}

export const getDuplicateUsername = (_username, callback) => {
    const url = `${config.apiUrl}/getDuplicateUsername?username=` + _username;
    getRequest(url, callback);
}