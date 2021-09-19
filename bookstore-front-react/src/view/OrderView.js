import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {DatePicker, Pagination} from "antd";
import SearchBox from "../components/SearchBox";
import Grid from "@material-ui/core/Grid";
import locale from 'antd/es/date-picker/locale/zh_CN';
import {getOrders} from "../services/OrderService";
import OrderCard from "../components/OrderCard";


const { RangePicker } = DatePicker;

const minTime = new Date("2000-01-01 00:00:00");
const maxTime = new Date("3000-01-01 00:00:00");
const pageSize = 15;

const styles = theme => ({
    header: {
        margin: 3,
    },
    searchBox: {
        float: "left",
    },
    datePicker: {
        margin: 3,
    },
    totalPrice: {
        float: "right",
        marginRight: "5vw",
        marginTop: 23,
        color: "red",
    },
    order: {
        margin: 10,
        borderRadius: 10,
    },
    page: {
        marginLeft: '33vw',
    },
});

class OrderView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderData: [],
            orderCount: 0,
            searchOrderText: "",
            startTime: minTime,
            endTime: maxTime,
            page: 1,
        };
        this.getOrders(1, this.state.startTime, this.state.endTime, this.state.searchOrderText);
    }

    getOrders(page, _startTime, _endTime, _searchText) {
        getOrders(page, pageSize, _startTime, _endTime, _searchText, (data) => {
            this.setState({
                orderData: data.content,
                orderCount: data.totalElements,
                searchOrderText: _searchText.trim(),
                startTime: _startTime,
                endTime: _endTime,
                page: page,
            });
        });
    }

    updateOrders() {
        this.getOrders(1, this.state.startTime, this.state.endTime, this.state.searchOrderText);
    }

    onTextChange(text) {
        this.setState({
            searchOrderText: text.trim(),
        });
    }

    onDateChange(dates, dateStrings) {
        if (dates == null) {
            this.getOrders(1, minTime, maxTime, this.state.searchOrderText)
            return;
        }
        let start = new Date(dates[0]);
        let end = new Date(dates[1]);
        this.getOrders(1, start, end, this.state.searchOrderText)
    }

    setPage(_page, _pageSize) {
        this.getOrders(_page, this.state.startTime, this.state.endTime, this.state.searchOrderText);
    }

    render() {
        if (this.state.orderData.length === 0) {
            return (
                <Typography variant={"h5"} align={"center"}>
                    你还没有订单，快去下单吧！
                </Typography>
            );
        }
        const { classes } = this.props;
        return (
            <div>
                <Grid container spacing={3} className={classes.header}>
                    <Grid item xs={4}>
                        <SearchBox  placeHolder={"搜索订单..."}
                                    text={this.state.searchOrderText}
                                    onTextChange={this.onTextChange.bind(this)}
                                    onEnterPress={this.updateOrders.bind(this)}
                                    className={classes.searchBox}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RangePicker showTime
                                     locale={locale}
                                     className={classes.datePicker}
                                     onChange={this.onDateChange.bind(this)}
                        />
                    </Grid>
                </Grid>
                {this.state.orderData.map((order, index) => {
                    return (
                        <OrderCard order={order} key={order.orderId}/>
                    );
                })}
                <div className={classes.page}>
                    <Pagination current={this.state.page}
                                total={this.state.orderCount}
                                defaultPageSize={pageSize}
                                onChange={this.setPage.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(OrderView);
