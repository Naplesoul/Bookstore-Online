import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Button} from "@material-ui/core";
import {getBook} from "../services/BookService";
import {config} from "../config";



const styles = theme => ({
    root: {
        width: "98%",
        marginLeft: "2vw",
        marginTop: "4vh",
    },
    detail: {
        marginLeft: "3vw",
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
        this.state = {
            bookData: {},
        };
        getBook(this.props.bookId, (data) => {
            this.setState({
                bookData: data,
            });
        });
    }

    addCart() {
        if (!this.props.user.isAuthed) {
            this.props.redirectTo("/login");
            return;
        }
        let cartData = this.props.cartData;
        let len = cartData.length;
        // if it exists in cart, then add one, set it to chosen
        for (let i = 0; i < len; ++i) {
            if (cartData[i].bookId === this.state.bookData.bookId) {
                if (cartData[i].bookNum + 1 <= cartData[i].storage) {
                    cartData[i].bookNum += 1;
                    cartData[i].chosen = true;
                }
                else {
                    alert("库存不足，不能再多啦");
                    return;
                }
                this.props.setCartData(cartData);
                return;
            }
        }
        // not in cart, add to cart
        if (this.state.bookData.storage === 0) {
            alert("此书已无货");
            return;
        }
        cartData.push({
            bookId: this.state.bookData.bookId,
            bookNum: 1,
            chosen: true,
            bookName: this.state.bookData.bookName,
            author: this.state.bookData.author,
            category: this.state.bookData.category,
            price: this.state.bookData.price,
            storage: this.state.bookData.storage,
        });
        this.props.setCartData(cartData);
    };

    buyNow() {
        if (!this.props.user.isAuthed) {
            this.props.redirectTo("/login");
            return;
        }
        let cartData = this.props.cartData;
        let len = cartData.length;
        let found = false;
        // if it exists in cart, then add one, set other books to not chosen
        for (let i = 0; i < len; ++i) {
            if (cartData[i].bookId === this.state.bookData.bookId) {
                if (cartData[i].bookNum + 1 <= cartData[i].storage)
                    cartData[i].bookNum += 1;
                cartData[i].chosen = true;
                found = true;
            } else
                cartData[i].chosen = false;
        }
        if (found) {
            this.props.setCartData(cartData);
            this.props.redirectTo("/store/cart");
            return;
        }
        // not in cart, add
        cartData.push({
            bookId: this.state.bookData.bookId,
            bookNum: 1,
            chosen: true,
            bookName: this.state.bookData.bookName,
            author: this.state.bookData.author,
            category: this.state.bookData.category,
            price: this.state.bookData.price,
            storage: this.state.bookData.storage,
        });
        this.props.setCartData(cartData);
        this.props.redirectTo("/store/cart");
    };

    renderButtons() {
        // if is an admin
        if (this.props.user.userType === 1) {
            return null;
        } else {
            const { classes } = this.props;
            return (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.cartButton}
                        startIcon={<ShoppingCartIcon/>}
                        onClick={this.addCart.bind(this)}
                    >
                        加入购物车
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={classes.buyButton}
                        startIcon={<ShoppingCartIcon/>}
                        onClick={this.buyNow.bind(this)}
                    >
                        立即购买
                    </Button>
                </div>
            );
        }
    }

    render() {
        const { classes } = this.props;
        // if is an admin
        return (
            <Grid container spacing={5} className={classes.root}>
                <Grid item xs={5}>
                    <img alt={"bookPicture"} src={`${config.apiUrl}/bookImage?bookId=` + this.props.bookId} width={"100%"}/>
                </Grid>
                <Grid item xs={5} className={classes.detail}>
                    <Typography variant={"h4"} className={classes.bookName}>{this.state.bookData.bookName}</Typography>
                    <Typography variant={"h6"}>作者： {this.state.bookData.author}</Typography>
                    <Typography variant={"h6"}>分类： {this.state.bookData.category}</Typography>
                    <Typography variant={"h6"}>
                        <span>单价：</span>
                        <span className={classes.price}>￥{(this.state.bookData.price/100).toFixed(2)}</span>
                    </Typography>
                    <Typography variant={"h6"}>
                        <span>库存：</span>
                        <span className={classes.stock}>{this.state.bookData.storage} pieces</span>
                    </Typography>
                    <Typography variant={"h6"}>ISBN： {this.state.bookData.ISBN}</Typography>
                    <Typography variant={"h6"}>简介：</Typography>
                    <Typography variant={"body1"}>{this.state.bookData.intro}</Typography>
                    {this.renderButtons()}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(InfoView);
