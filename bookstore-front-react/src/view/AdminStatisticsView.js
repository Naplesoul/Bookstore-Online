import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {getOrders} from "../services/OrderService";
import Typography from "@material-ui/core/Typography";
import locale from "antd/es/date-picker/locale/zh_CN";
import {Card, DatePicker} from "antd";
import Grid from "@material-ui/core/Grid";
import BookRankItem from "../components/BookRankItem";
import WhatshotIcon from '@material-ui/icons/Whatshot';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import {Button} from "@material-ui/core";
import {getUsers} from "../services/UserService";
import UserRankItem from "../components/UserRankItem";



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

class AdminStatisticsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderData: [],
            userData: [],
            bookRank: [],
            userRank: [],
            totalBookNum: 0,
            totalPrice: 0,
            rankBook: true,
        };

        getOrders(this.props.user.userId, (_orderData) => {
            this.setState({
                orderData: _orderData,
            });
            this.updateBook(_orderData);
            getUsers(this.props.user.userId, (_userData) => {
                if (_userData != null) {
                    this.setState({
                        userData: _userData,
                    });
                }
                this.updateUser(_orderData);
            });
        });
    };

    showBookRank() {
        this.setState({
            rankBook: true,
        });
    }

    showUserRank() {
        this.setState({
            rankBook: false,
        });
    }

    onDateChange(dates, dateStrings) {
        if (dates == null) {
            this.updateBook(this.state.orderData);
            this.updateUser(this.state.orderData);
            return;
        }
        let start = (new Date(dates[0])).getTime();
        let end = (new Date(dates[1])).getTime();
        let orderData = [];
        let len = this.state.orderData.length;
        for (let i = 0; i < len; ++i) {
            let timestamp = (new Date(this.state.orderData[i].orderTime)).getTime();
            if (timestamp <= end && timestamp >= start) {
                orderData.push(this.state.orderData[i]);
            }
        }
        this.updateBook(orderData);
        this.updateUser(orderData);
    }



    updateBook(orderData) {
        let len = orderData.length;
        let bookRank = [];
        let totalBookNum = 0;
        let totalPrice = 0;
        for (let i = 0; i < len; ++i) {
            let itemLen = orderData[i].orderItems.length;
            totalPrice += orderData[i].totalPrice;
            for (let j = 0; j < itemLen; ++j) {
                let bookId = orderData[i].orderItems[j].bookId;
                let bookNum = orderData[i].orderItems[j].bookNum;
                totalBookNum += bookNum;
                let pLen = bookRank.length;
                let found = false;
                for (let k = 0; k < pLen; ++k) {
                    if (bookRank[k].bookId === bookId) {
                        bookRank[k].bookNum += bookNum;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    bookRank.push({
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
        bookRank.sort((a, b) => {
            return b.bookNum - a.bookNum;
        });
        this.setState({
            bookRank: bookRank,
            totalBookNum: totalBookNum,
            totalPrice: totalPrice,
        });
    }

    updateUser(orderData) {
        let len = orderData.length;
        let userRank = [];
        for (let i = 0; i < len; ++i) {
            let userId = orderData[i].userId;
            let orderPrice = orderData[i].totalPrice;
            let rankLen = userRank.length;
            let found = false;
            for (let j = 0; j < rankLen; ++j) {
                if (userRank[j].userId === userId) {
                    userRank[j].totalPrice += orderPrice;
                    found = true;
                    break;
                }
            }
            if (!found) {
                let userLen = this.state.userData.length;
                for (let j = 0; j < userLen; ++j) {
                    if (this.state.userData[j].userId === userId) {
                        userRank.push({
                            userId: userId,
                            totalPrice: orderPrice,
                            username: this.state.userData[j].username,
                            userInfo: this.state.userData[j].userInfo,
                        });
                    }
                }
            }
        }
        userRank.sort((a, b) => {
            return b.totalPrice - a.totalPrice;
        });
        this.setState({
            userRank: userRank,
        });
    }


    renderRank() {
        const { classes } = this.props;
        if (this.state.rankBook) {
            return (
                <Card className={classes.rank}>
                    {this.state.bookRank.map((book, index) => {
                        return (
                            <BookRankItem book={book} index={index + 1}/>
                        );
                    })}
                </Card>
            );
        } else {
            return (
                <Card className={classes.rank}>
                    {this.state.userRank.map((user, index) => {
                        return (
                            <UserRankItem user={user} index={index + 1}/>
                        );
                    })}
                </Card>
            );
        }
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
                    <Grid item xs={4}>
                        <RangePicker showTime
                                     locale={locale}
                                     className={classes.datePicker}
                                     onChange={this.onDateChange.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6">
                            售出数：{this.state.totalBookNum}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6">
                            营业额：
                        </Typography>
                        <Typography variant="h6" className={classes.totalPrice}>
                            ￥{(this.state.totalPrice/100).toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<WhatshotIcon/>}
                            onClick={this.showBookRank.bind(this)}
                        >
                            热销榜
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<LocalAtmIcon/>}
                            onClick={this.showUserRank.bind(this)}
                        >
                            消费榜
                        </Button>
                    </Grid>
                </Grid>
                {this.renderRank()}
            </div>
        );
    }

};

export default withStyles(styles)(AdminStatisticsView);