export const checkEmail = (email) => {
    // eslint-disable-next-line
    return email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) !== -1;
}

export const checkPhoneNumber = (tel) => {
    // eslint-disable-next-line
    return (/^1[3|5|7|8][0-9]\d{4,8}$/.test(tel));
}
