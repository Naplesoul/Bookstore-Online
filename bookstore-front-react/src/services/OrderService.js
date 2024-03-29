import {config} from "../config";
import {getRequest, postRequest} from "../utils/ajax";

// eslint-disable-next-line
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
        // eslint-disable-next-line
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

export const getOrders = (_page, _size, _startTime, _endTime, _searchText, callback) => {
    const url = `${config.apiUrl}/orders?page=${_page.toString()}&size=${_size.toString()}&searchText=${_searchText.trim()}`
        + `&startTime=${_startTime.Format("yyyy-MM-dd hh:mm:ss.S")}&endTime=${_endTime.Format("yyyy-MM-dd hh:mm:ss.S")}`;
    getRequest(url, callback);
}

export const getOrderItems = (_orderId, callback) => {
    const url = `${config.apiUrl}/orderItems/${_orderId.toString()}`;
    getRequest(url, callback);
}

export const placeOrder = (_orderItems, callback) => {
    const url = `${config.apiUrl}/order`;
    let orderForm = {
        orderItems: _orderItems,
    };
    postRequest(url, orderForm, callback);
}

export const getTotalSalesAndConsumption = (_startTime, _endTime, callback) => {
    const url = `${config.apiUrl}/totalSalesAndConsumption`
        + `?startTime=${_startTime.Format("yyyy-MM-dd hh:mm:ss.S")}&endTime=${_endTime.Format("yyyy-MM-dd hh:mm:ss.S")}`;
    getRequest(url, callback);
}

export const getSalesRank = (_page, _size, _startTime, _endTime, callback) => {
    const url = `${config.apiUrl}/salesRank?page=${_page.toString()}&size=${_size.toString()}`
        + `&startTime=${_startTime.Format("yyyy-MM-dd hh:mm:ss.S")}&endTime=${_endTime.Format("yyyy-MM-dd hh:mm:ss.S")}`;
    getRequest(url, callback);
}

export const getConsumptionRank = (_page, _size, _startTime, _endTime, callback) => {
    const url = `${config.apiUrl}/consumptionRank?page=${_page.toString()}&size=${_size.toString()}`
        + `&startTime=${_startTime.Format("yyyy-MM-dd hh:mm:ss.S")}&endTime=${_endTime.Format("yyyy-MM-dd hh:mm:ss.S")}`;
    getRequest(url, callback);
}
