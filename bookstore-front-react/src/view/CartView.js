import React from "react";
import {withStyles} from "@material-ui/core/styles";
import CartItem from "../components/CartItem";
import {Card, Grid, Button} from "@material-ui/core";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import Typography from "@material-ui/core/Typography";


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
        backgroundColor: "#d53838",
    },
});

class CartView extends React.Component {
    constructor(props) {
        super(props);

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

    render() {
        if (this.props.cartData.length === 0) {
            return (
                <Typography variant={"h5"} align={"center"}>
                    Your cart is empty, go and get some!
                </Typography>
            );
        }
        let totalPrice = 0;
        this.props.cartData.forEach(item => {
            if(item.isChosen) {
                totalPrice += item.price * item.num;
            }
        });
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
                                Total: ￥{totalPrice.toFixed(2)}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                className={classes.buyButton}
                                startIcon={<LocalAtmIcon />}
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