import {config} from "../config";
import {postRequest} from "../utils/ajax";

export const getOrders = (_userId, callback) => {
    const url = `${config.apiUrl}/getOrders`;
    let userForm = {
        userId: _userId
    };
    postRequest(url, userForm, callback);
}

export const placeOrder = (_userId, _totalPrice, _items) => {
    const url = `${config.apiUrl}/placeOrder`;
    let orderForm = {
        userId: _userId,
        totalPrice: _totalPrice,
        items: _items,
    };
    postRequest(url, orderForm, (data) => {
        if (!data)
            alert("订单录入失败！");
    })
}