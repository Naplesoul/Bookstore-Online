import {config} from "../config";
import {postRequest} from "../utils/ajax";

export const getOrders = (_userId, callback) => {
    const url = `${config.apiUrl}/getOrders`;
    let userForm = {
        userId: _userId
    };
    postRequest(url, userForm, callback);
}

export const placeOrder = (_userId, _orderItems, callback) => {
    const url = `${config.apiUrl}/placeOrder`;
    let orderForm = {
        userId: _userId,
        orderItems: _orderItems,
    };
    postRequest(url, orderForm, callback)
}