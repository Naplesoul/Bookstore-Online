import React from "react";
import {withStyles} from "@material-ui/core/styles";
import CartItem from "../components/CartItem";
import {Card, Grid, Button} from "@material-ui/core";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import Typography from "@material-ui/core/Typography";
import {placeOrder} from "../services/OrderService";


const styles = theme => ({
    cart: {
        marginBottom: 70,
    },
    cashier: {
        position: "fixed",
        bottom: 0,
        right: 80,
        height: 80,
        width: "40%",
        border: "solid",
        borderWidth: 5,
        borderColor: "#bdbec4"
    },
    totalPrice: {
        marginLeft: "5vw",
        marginTop: 23,
        color: "red",
    },
    buyButton: {
        marginTop: 17,
        // backgroundColor: "#d53838",
    },
});

class CartView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPrice: 0,
        }
    }


    onNumberChange(bookId, bookNum) {
        let cartData = this.props.cartData;
        let len = cartData.length;
        for (let i = 0; i < len; ++i) {
            if (cartData[i].bookId === bookId) {
                cartData[i].bookNum = bookNum;
                break;
            }
        }
        this.props.setCartData(cartData);
    };

    remove(bookId) {
        let cartData = this.props.cartData;
        let len = cartData.length;
        for (let i = 0; i < len; ++i) {
            if (cartData[i].bookId === bookId) {
                cartData.splice(i, 1);
                break;
            }
        }
        this.props.setCartData(cartData);
    };

    choose(bookId) {
        let cartData = this.props.cartData;
        let len = cartData.length;
        for (let i = 0; i < len; ++i) {
            if (cartData[i].bookId === bookId) {
                cartData[i].chosen = !cartData[i].chosen;
                break;
            }
        }
        this.props.setCartData(cartData);
    };

    getTotalPrice() {
        let totalPrice = 0;
        this.props.cartData.forEach(item => {
            if(item.chosen)
                totalPrice += item.price * item.bookNum;
        });
        return totalPrice;
    }

    placeOrder() {
        let cartData = [];
        let orderItems = [];
        let len = this.props.cartData.length;
        for (let i = 0; i < len; ++i) {
            if (this.props.cartData[i].chosen) {
                orderItems.push({
                    bookId: this.props.cartData[i].bookId,
                    bookNum: this.props.cartData[i].bookNum,
                });
            } else {
                cartData.push(this.props.cartData[i]);
            }
        }
        // alter storage
        len = orderItems.length;
        if (len <= 0)
            return;
        let bookData = this.props.bookData;
        let bookLen = bookData.length;
        for (let i = 0; i < len; ++i) {
            for (let j = 0; j < bookLen; ++j) {
                if (bookData[j].bookId === orderItems[i].bookId) {
                    bookData[j].storage -= orderItems[i].bookNum;
                    break;
                }
            }
        }

        placeOrder(this.props.user.userId, orderItems, (data) => {
            if (data) {
                this.props.setCartData(cartData);
                this.props.setBookData(bookData);
                alert("下单成功！");
            } else {
                alert("订单录入失败！");
            }
        });

    }

    render() {
        if (this.props.cartData.length === 0) {
            return (
                <Typography variant={"h5"} align={"center"}>
                    购物车空空如也，快去加入一些书吧！
                </Typography>
            );
        }
        const { classes } = this.props;
        return(
            <div>
                <div className={classes.cart}>
                    {this.props.cartData.map((item, index) => {
                        return <CartItem itemData={item} onNumberChange={this.onNumberChange.bind(this)} remove={this.remove.bind(this)}
                                         choose={this.choose.bind(this)}
                        />;
                    })}
                </div>
                <Card className={classes.cashier}>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <Typography variant={"h5"} className={classes.totalPrice}>
                                总价： ￥{(this.getTotalPrice()/100).toFixed(2)}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                className={classes.buyButton}
                                startIcon={<LocalAtmIcon />}
                                onClick={this.placeOrder.bind(this)}
                            >
                                下单
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(CartView);