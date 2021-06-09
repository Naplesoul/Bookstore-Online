import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {getOrders} from "../services/OrderService";
import Typography from "@material-ui/core/Typography";
import locale from "antd/es/date-picker/locale/zh_CN";
import {Card, DatePicker} from "antd";
import Grid from "@material-ui/core/Grid";
import BookRankItem from "../components/BookRankItem";



const { RangePicker } = DatePicker;

const styles = theme => ({
    root: {
        margin: "3vw",
    },
    rank: {
        marginTop: 20,
        borderRadius: 10,
    },
    totalPrice: {
        color: "red",
    },
});

class UserStatisticsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderData: [],
            processedData: [],
            totalBookNum: 0,
            totalPrice: 0,
        };
        getOrders(this.props.user.userId, (data) => {
            this.setState({
                orderData: data,
            });
            this.update(0, Number.MAX_VALUE);
        });
    };

    onDateChange(dates, dateStrings) {
        if (dates == null) {
            this.update(0, Number.MAX_VALUE);
            return;
        }
        let start = new Date(dates[0]);
        let end = new Date(dates[1]);
        this.update(start.getTime(), end.getTime());
    }

    update(startTime, endTime) {
        let orderData = [];
        let len = this.state.orderData.length;
        for (let i = 0; i < len; ++i) {
            let timestamp = (new Date(this.state.orderData[i].orderTime)).getTime();
            if (timestamp <= endTime && timestamp >= startTime) {
                orderData.push(this.state.orderData[i]);
            }
        }
        len = orderData.length;
        let processedData = [];
        let totalBookNum = 0;
        let totalPrice = 0;
        for (let i = 0; i < len; ++i) {
            let itemLen = orderData[i].orderItems.length;
            totalPrice += orderData[i].totalPrice;
            for (let j = 0; j < itemLen; ++j) {
                let bookId = orderData[i].orderItems[j].bookId;
                let bookNum = orderData[i].orderItems[j].bookNum;
                totalBookNum += bookNum;
                let pLen = processedData.length;
                let found = false;
                for (let k = 0; k < pLen; ++k) {
                    if (processedData[k].bookId === bookId) {
                        processedData[k].bookNum += bookNum;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    processedData.push({
                        bookId: bookId,
                        bookNum: bookNum,
                        bookName: orderData[i].orderItems[j].bookName,
                        author: orderData[i].orderItems[j].author,
                        category: orderData[i].orderItems[j].category,
                        bookPrice: orderData[i].orderItems[j].bookPrice,
                        image: orderData[i].orderItems[j].image,
                    });
                }
            }
        }
        processedData.sort((a, b) => {
            return b.bookNum - a.bookNum;
        });
        this.setState({
            processedData: processedData,
            totalBookNum: totalBookNum,
            totalPrice: totalPrice,
        });
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
            <div className={classes.root}>
                <Grid container spacing={3} className={classes.header}>
                    <Grid item xs={2}>
                        <Typography variant="h5">
                            购书统计
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <RangePicker showTime
                                     locale={locale}
                                     className={classes.datePicker}
                                     onChange={this.onDateChange.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6">
                            购书总数：{this.state.totalBookNum}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6">
                            <span>
                                消费总额：
                            </span>
                            <span className={classes.totalPrice}>
                                ￥{(this.state.totalPrice/100).toFixed(2)}
                            </span>
                        </Typography>
                    </Grid>
                </Grid>
                <Card className={classes.rank}>
                    {this.state.processedData.map((book, index) => {
                        return (
                            <BookRankItem book={book} index={index + 1}/>
                        );
                    })}
                </Card>
            </div>
        );
    }

};

export default withStyles(styles)(UserStatisticsView);