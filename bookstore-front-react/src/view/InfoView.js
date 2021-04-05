import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Button} from "@material-ui/core";



const styles = theme => ({
    root: {
        width: "96%",
        marginLeft: "4vw",
        marginTop: "2vh",
    },
    detail: {
        marginLeft: "3vw",
        // backgroundColor: "black"
    },
    bookName: {
        marginTop: "7vh",
        marginBottom: "4vh",
    },
    price: {
        color: "red",
    },
    stock: {
        color: "green",
    },
    cartButton: {
        top: "80vh",
        left: "58vw",
        position: "absolute",
    },
    buyButton: {
        top: "80vh",
        left: "76vw",
        position: "absolute",
    },
});

class InfoView extends React.Component {
    constructor(props) {
        super(props);

    }

    addCart() {
        this.props.addCart(this.props.bookInfo.id, false);
    };

    buyNow() {
        this.props.addCart(this.props.bookInfo.id, true);
    };

    render() {
        const { classes } = this.props;
        return(
            <Grid container spacing={5} className={classes.root}>
                <Grid item xs={5}>
                    <img alt={"bookPicture"} src={this.props.bookInfo.picDir} width={"87%"}/>
                </Grid>
                <Grid item xs={5} className={classes.detail}>
                    <Typography variant={"h4"} className={classes.bookName}>{this.props.bookInfo.name}</Typography>
                    <Typography variant={"h6"}>Author: {this.props.bookInfo.author}</Typography>
                    <Typography variant={"h6"}>Category: {this.props.bookInfo.category}</Typography>
                    <Typography variant={"h6"}>
                        <span>Price: </span>
                        <span className={classes.price}>￥{this.props.bookInfo.price}</span>
                    </Typography>
                    <Typography variant={"h6"}>
                        <span>Stock: </span>
                        <span className={classes.stock}>{this.props.bookInfo.storage} pieces</span>
                    </Typography>
                    <Typography variant={"h6"}>Introduction: </Typography>
                    <Typography variant={"h7"}>{this.props.bookInfo.intro}</Typography>
                    {/*<Typography variant={"h6"}></Typography>*/}
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.cartButton}
                        startIcon={<ShoppingCartIcon/>}
                        onClick={this.addCart.bind(this)}
                    >
                        Add Cart
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={classes.buyButton}
                        startIcon={<ShoppingCartIcon/>}
                        onClick={this.buyNow.bind(this)}
                    >
                        Buy Now
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(InfoView);