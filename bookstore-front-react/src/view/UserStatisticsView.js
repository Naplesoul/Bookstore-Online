import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {getSalesRank, getTotalSalesAndConsumption} from "../services/OrderService";
import Typography from "@material-ui/core/Typography";
import locale from "antd/es/date-picker/locale/zh_CN";
import {Card, DatePicker, Pagination} from "antd";
import Grid from "@material-ui/core/Grid";
import BookRankItem from "../components/BookRankItem";


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

class UserStatisticsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookRank: [],
            bookCount: 0,
            totalBookNum: 0,
            totalPrice: 0,
            page: 1,
        };
    };

    componentDidMount() {
        this.updateData(1, minTime, maxTime);
    }

    updateData(page, startTime, endTime) {
        getTotalSalesAndConsumption(startTime, endTime, (data) => {
            this.setState({
                totalPrice: data.totalConsumption,
                totalBookNum: data.totalSales,
            });
        });
        getSalesRank(page, pageSize, startTime, endTime, (data) => {
            this.setState({
                bookCount: data.totalElements,
                bookRank: data.content,
            });
        })
        this.setState({
            page: page,
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
                    {this.state.bookRank.map((rank, index) => {
                        return (
                            <BookRankItem book={rank.book} index={index + 1} sales={rank.sales} key={rank.book.bookId}/>
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
    }

};

export default withStyles(styles)(UserStatisticsView);
