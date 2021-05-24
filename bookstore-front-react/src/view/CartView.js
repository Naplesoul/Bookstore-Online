import React from "react";
import {Redirect} from 'react-router-dom';
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
        this.getTotalPrice = this.getTotalPrice.bind(this);
        this.state = {
            totalPrice: 0,
        }
    }


    onNumberChange(id, num) {
        this.props.onNumberChange(id, num);
    };

    remove(id) {
        this.props.remove(id);
    };

    choose(id) {
        this.props.choose(id);
    };

    getTotalPrice() {
        let totalPrice = 0;
        this.props.cartData.forEach(item => {
            if(item.isChosen) {
                totalPrice += item.price * item.num;
            }
        });
        return totalPrice;
    }

    placeOrder() {
        let items = [];
        let removeIds = [];
        let len = this.props.cartData.length;
        for (let i = 0; i < len; ++i) {
            if (this.props.cartData[i].isChosen) {
                items.push({
                    bookId: this.props.cartData[i].id,
                    bookNum: this.props.cartData[i].num,
                })
                removeIds.push(this.props.cartData[i].id);
            }
        }
        this.props.removeSomeAndReduceStorage(removeIds);
        placeOrder(this.props.user.id, this.getTotalPrice(), items);
    }

    render() {
        if (!this.props.user.isAuthed)
            return (
                <Redirect to={{pathname: "/store"}}/>
            );
        if (this.props.cartData.length === 0) {
            return (
                <Typography variant={"h5"} align={"center"}>
                    Oops! Your cart is empty, go and get some!
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
                                Total: ￥{(this.getTotalPrice()/100).toFixed(2)}
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
                                BuyNow
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(CartView);