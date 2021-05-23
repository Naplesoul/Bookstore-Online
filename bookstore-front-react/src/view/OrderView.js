import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {getOrders} from "../services/OrderService";
import Typography from "@material-ui/core/Typography";
import OrderItem from "../components/OrderItem";
import {Card} from "antd";

let orderData = [];

const styles = theme => ({
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
            orderData: orderData,
        }
        getOrders(this.props.user.id, (data) => {
            this.setState({
                orderData: data,
            })
        })
    }

    getItemData(bookId) {
        console.log(bookId);
        let len = this.props.bookData.length;
        for (let i = 0; i < len; ++i) {
            if (this.props.bookData[i].id === bookId) {
                return this.props.bookData[i];
            }
        }
    }

    render() {
        if (this.state.orderData.length === 0) {
            return (
                <Typography variant={"h5"} align={"center"}>
                    Oops! You haven't place any orders, go and get some!
                </Typography>
            );
        } else {
            const { classes } = this.props;
            return (
                <div>
                    {this.state.orderData.map((order, index) => {
                        return (
                            <Card className={classes.order}>
                                <Typography component="h5" variant="h5">
                                    Order ID: {order.id}
                                </Typography>
                                <div>
                                    {order.items.map((item, index) => {
                                        return (<OrderItem itemData={this.getItemData(item.bookId)}
                                                           bookNum={item.bookNum}
                                        />);
                                    })}
                                </div>
                                <Typography variant="h5" className={classes.totalPrice}>
                                    Total: ￥{(order.totalPrice/100).toFixed(2)}
                                </Typography>
                            </Card>
                        );
                    })}
                </div>
            );
        }
    }
}

export default withStyles(styles)(OrderView);