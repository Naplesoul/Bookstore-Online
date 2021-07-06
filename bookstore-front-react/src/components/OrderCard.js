import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import OrderItem from "../components/OrderItem";
import {Card} from "antd";
import Grid from "@material-ui/core/Grid";
import {IconButton} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {getOrderItems} from "../services/OrderService";


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

class OrderCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showItems: false,
            orderItems: [],
        };
    }

    showItems() {
        if (this.state.showItems) {
            this.setState({
                showItems: false,
            });
        } else if (this.state.orderItems.length > 0) {
            this.setState({
                showItems: true,
            });
        } else {
            getOrderItems(this.props.order.orderId, (data) => {
                this.setState({
                    orderItems: data,
                    showItems: true,
                });
            });
        }
    }

    renderItems() {
        if (this.state.orderItems.length > 0 && this.state.orderItems[0].orderId !== this.props.order.orderId) {
            getOrderItems(this.props.order.orderId, (data) => {
                this.setState({
                    orderItems: data,
                });
            });
            return null;
        }
        if (this.state.showItems) {
            return (
                <div>
                    {this.state.orderItems.map((item, index) => {
                        return (<OrderItem orderItem={item}/>);
                    })}
                </div>
            );
        }
        return null;
    }

    renderButton() {
        if (this.state.showItems) {
            return (
                <IconButton onClick={this.showItems.bind(this)}>
                    <KeyboardArrowUpIcon/>
                </IconButton>
            );
        } else {
            return (
                <IconButton onClick={this.showItems.bind(this)}>
                    <KeyboardArrowDownIcon/>
                </IconButton>
            );
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.order}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Typography component="h6" variant="h6">
                            订单号： {this.props.order.orderId}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography component="h6" variant="h6">
                            订单时间： {this.props.order.orderTime}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography component="h6" variant="h6">
                            用户ID： {this.props.order.userId}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        {this.renderButton()}
                    </Grid>
                </Grid>
                <div>
                    {this.renderItems()}
                </div>
                <Typography variant="h5" className={classes.totalPrice}>
                    总价： ￥{(this.props.order.totalPrice / 100).toFixed(2)}
                </Typography>
            </Card>
        );
    }
}

export default withStyles(styles)(OrderCard);