import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import locale from "antd/es/date-picker/locale/zh_CN";
import {Card, DatePicker, Pagination} from "antd";
import Grid from "@material-ui/core/Grid";
import BookRankItem from "../components/BookRankItem";
import WhatshotIcon from '@material-ui/icons/Whatshot';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import {Button} from "@material-ui/core";
import UserRankItem from "../components/UserRankItem";
import {getConsumptionRank, getSalesRank, getTotalSalesAndConsumption} from "../services/OrderService";



const { RangePicker } = DatePicker;

const minTime = new Date("2000-01-01 00:00:00");
const maxTime = new Date("3000-01-01 00:00:00");
const pageSize = 15;

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
    page: {
        marginTop: '2vh',
        marginLeft: '33vw',
    },
});

class AdminStatisticsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookRank: [],
            userRank: [],
            bookCount: 0,
            userCount: 0,
            totalBookNum: 0,
            totalPrice: 0,
            rankBook: true,
            page: 1,
            startTime: minTime,
            endTime: maxTime,
        };
        this.updateData(1, minTime, maxTime);
    };

    updateData(page, startTime, endTime) {
        getTotalSalesAndConsumption(this.props.user.userId, startTime, endTime, (data) => {
            this.setState({
                totalPrice: data.totalConsumption,
                totalBookNum: data.totalSales,
            });
        })
        getConsumptionRank(page, pageSize, startTime, endTime, (data) => {
            this.setState({
                userCount: data.totalElements,
                userRank: data.content,
            });
        })
        getSalesRank(this.props.user.userId, page, pageSize, startTime, endTime, (data) => {
            this.setState({
                bookCount: data.totalElements,
                bookRank: data.content,
            });
        })
        this.setState({
            page: page,
        });
    }

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
            this.updateData(1, minTime, maxTime);
            return;
        }
        let start = new Date(dates[0]);
        let end = new Date(dates[1]);
        this.updateData(1, start, end);
    }

    setPage(page, pageSize) {
        this.updateData(page, this.state.startTime, this.state.endTime);
    }

    renderRank() {
        const { classes } = this.props;
        if (this.state.rankBook) {
            return (
                <div>
                    <Card className={classes.rank}>
                        {this.state.bookRank.map((rank, index) => {
                            return (
                                <BookRankItem book={rank.book} index={index + 1} sales={rank.sales}/>
                            );
                        })}
                    </Card>
                    <div className={classes.page}>
                        <Pagination current={this.state.page}
                                    total={this.state.bookCount}
                                    defaultPageSize={pageSize}
                                    onChange={this.setPage.bind(this)}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Card className={classes.rank}>
                        {this.state.userRank.map((rank, index) => {
                            return (
                                <UserRankItem user={rank.user} index={index + 1} consumption={rank.consumption}/>
                            );
                        })}
                    </Card>
                    <div className={classes.page}>
                        <Pagination current={this.state.page}
                                    total={this.state.userCount}
                                    defaultPageSize={pageSize}
                                    onChange={this.setPage.bind(this)}
                        />
                    </div>
                </div>
            );
        }
    }

    render() {
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