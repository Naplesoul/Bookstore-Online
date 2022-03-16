import {config} from "../config";
import {deleteRequest, getRequest, postRequest, putRequest} from "../utils/ajax";

export const login = (_username, _password, callback) => {
    const url = `${config.apiUrl}/session`;
    let loginForm = {
        username: _username,
        password: _password,
        // username: "shenwhang",
        // password: "123456"
    };
    postRequest(url, loginForm, callback);
}

export const autoLogin = (callback) => {
    const url = `${config.apiUrl}/session`;
    getRequest(url, callback);
}

export const logout = (callback) => {
    const url = `${config.apiUrl}/session`;
    deleteRequest(url, callback);
}

export const signup = (_username, _password, _email, callback) => {
    const url = `${config.apiUrl}/user`;
    let signupForm = {
        username: _username,
        password: _password,
        email: _email,
    };
    postRequest(url, signupForm, callback);
}

export const getUsers = (callback) => {
    const url = `${config.apiUrl}/admin/users`;
    getRequest(url, callback);
}

export const setUserType = (_targetUserId, _targetUserType, callback) => {
    const url = `${config.apiUrl}/admin/userType/${_targetUserId}`;
    let form = {
        targetUserType: _targetUserType,
    };
    putRequest(url, form, callback);
}

export const getReduplicateUsername = (_username, callback) => {
    const url = `${config.apiUrl}/reduplicatedUsername/${_username}`;
    getRequest(url, callback);
}

export const setUserInfo = (userInfo, callback) => {
    const url = `${config.apiUrl}/userInfo`;
    let form = { userInfo };
    putRequest(url, form, callback);
}

export const setAvatar = (image, callback) => {
    const url = `${config.apiUrl}/avatar`;
    let form = {
        image: image.split(',')[1],
    };
    putRequest(url, form, callback);
}

export const getVisitCount = (callback) => {
    const url = `${config.apiUrl}/visitCount`;
    getRequest(url, callback)
}
