import {config} from "../config";
import {getRequest, postRequest} from "../utils/ajax";

Date.prototype.Format = function (fmt) { //author: meizz
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

export const getOrders = (_userId, _page, _size, _startTime, _endTime, _searchText, callback) => {
    const url = `${config.apiUrl}/getOrders?userId=` + _userId.toString() + "&page="
        + _page.toString() + "&size=" + _size.toString() + "&searchText=" + _searchText.trim();
    let timeForm = {
        startTime: _startTime.Format("yyyy-MM-dd hh:mm:ss.S"),
        endTime: _endTime.Format("yyyy-MM-dd hh:mm:ss.S"),
    };
    postRequest(url, timeForm, callback);
}

export const getOrderItems = (_orderId, callback) => {
    const url = `${config.apiUrl}/getOrderItems?orderId=` + _orderId.toString();
    getRequest(url, callback);
}

export const placeOrder = (_userId, _orderItems, callback) => {
    const url = `${config.apiUrl}/placeOrder`;
    let orderForm = {
        userId: _userId,
        orderItems: _orderItems,
    };
    postRequest(url, orderForm, callback);
}

export const getTotalSalesAndConsumption = (_userId, _startTime, _endTime, callback) => {
    const url = `${config.apiUrl}/getTotalSalesAndConsumption?userId=` + _userId.toString();
    let timeForm = {
        startTime: _startTime.Format("yyyy-MM-dd hh:mm:ss.S"),
        endTime: _endTime.Format("yyyy-MM-dd hh:mm:ss.S"),
    };
    postRequest(url, timeForm, callback);
}

export const getSalesRank = (_userId, _page, _size, _startTime, _endTime, callback) => {
    const url = `${config.apiUrl}/getSalesRank?userId=` + _userId.toString() + "&page=" + _page.toString() + "&size=" + _size.toString();
    let timeForm = {
        startTime: _startTime.Format("yyyy-MM-dd hh:mm:ss.S"),
        endTime: _endTime.Format("yyyy-MM-dd hh:mm:ss.S"),
    };
    postRequest(url, timeForm, callback);
}

export const getConsumptionRank = (_page, _size, _startTime, _endTime, callback) => {
    const url = `${config.apiUrl}/getConsumptionRank?page=` + _page.toString() + "&size=" + _size.toString();
    let timeForm = {
        startTime: _startTime.Format("yyyy-MM-dd hh:mm:ss.S"),
        endTime: _endTime.Format("yyyy-MM-dd hh:mm:ss.S"),
    };
    postRequest(url, timeForm, callback);
}