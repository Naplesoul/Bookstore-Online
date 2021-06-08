import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import OrderItem from "../components/OrderItem";
import {Card, DatePicker} from "antd";
import SearchBox from "../components/SearchBox";
import Grid from "@material-ui/core/Grid";
import locale from 'antd/es/date-picker/locale/zh_CN';
import {getOrders} from "../services/OrderService";


const { RangePicker } = DatePicker;

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
});

class OrderView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderData: [],
            searchOrderText: "",
            startTime: 0,
            endTime: Number.MAX_VALUE,
        };
        getOrders(this.props.user.userId, (data) => {
            this.setState({
                orderData: data,
            });
        });
    }


    onTextChange(text) {
        this.setState({
            searchOrderText: text,
        });
    }

    onDateChange(dates, dateStrings) {
        if (dates == null) {
            this.setState({
                startTime: 0,
                endTime: Number.MAX_VALUE,
            })
            return;
        }
        let start = new Date(dates[0]);
        let end = new Date(dates[1]);
        this.setState({
            startTime: start.getTime(),
            endTime: end.getTime(),
        })
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
                    let len = order.orderItems.length;
                    for (let i = 0; i < len; ++i) {
                        let timestamp = (new Date(order.orderTime)).getTime();
                        if (order.orderItems[i].bookName.toString().toLowerCase().indexOf(this.state.searchOrderText) >= 0
                            && timestamp <= this.state.endTime && timestamp >= this.state.startTime) {
                            return (
                                <Card className={classes.order}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <Typography component="h6" variant="h6">
                                                订单号： {order.orderId}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography component="h6" variant="h6">
                                                订单时间： {order.orderTime}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography component="h6" variant="h6">
                                                用户Id： {this.props.user.userId}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <div>
                                        {order.orderItems.map((item, index) => {
                                            return (<OrderItem orderItem={item}/>);
                                        })}
                                    </div>
                                    <Typography variant="h5" className={classes.totalPrice}>
                                        总价： ￥{(order.totalPrice/100).toFixed(2)}
                                    </Typography>
                                </Card>
                            );
                        }
                    }
                    return null;
                })}
            </div>
        );
    }
}

export default withStyles(styles)(OrderView);