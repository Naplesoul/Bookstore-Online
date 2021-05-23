import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Button, TextField} from "@material-ui/core";



const styles = theme => ({
    root: {
        width: "98%",
        marginLeft: "2vw",
        marginTop: "4vh",
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
    introBox: {
        width: "30vw",
        margin: 10,
    },
    box: {
        width: "14vw",
        margin: 10,
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

    onNameChange(e) {
        let newData = this.props.bookInfo;
        newData.name = e.target.value.trim();
        this.props.onBookDataChange(this.props.bookInfo.id, newData);
    };

    onAuthorChange(e) {
        let newData = this.props.bookInfo;
        newData.author = e.target.value.trim();
        this.props.onBookDataChange(this.props.bookInfo.id, newData);
    };

    onPriceChange(e) {
        let value = e.target.value;
        if(isNaN(value)) {
            return;
        }
        value = parseFloat(value);
        value = parseFloat(value.toFixed(2));
        let newData = this.props.bookInfo;
        newData.price = value;
        this.props.onBookDataChange(this.props.bookInfo.id, newData);
    };

    onStockChange(e) {
        let value = e.target.value;
        if(isNaN(value)) {
            return;
        }
        value = parseFloat(value);
        value = parseInt(value.toFixed(0));
        let newData = this.props.bookInfo;
        newData.storage = value;
        this.props.onBookDataChange(this.props.bookInfo.id, newData);
    };

    onCategoryChange(e) {
        let newData = this.props.bookInfo;
        newData.category = e.target.value.trim();
        this.props.onBookDataChange(this.props.bookInfo.id, newData);
    };

    onIntroductionChange(e) {
        let newData = this.props.bookInfo;
        newData.intro = e.target.value.trim();
        this.props.onBookDataChange(this.props.bookInfo.id, newData);
    };

    render() {
        const { classes } = this.props;
        // is the user is admin, he can revise the content
        if (this.props.user.isAdmin) {
            return(
                <Grid container spacing={5} className={classes.root}>
                    <Grid item xs={5}>
                        <img alt={"bookPicture"} src={this.props.bookInfo.image} width={"100%"}/>
                    </Grid>
                    <Grid item xs={5} className={classes.detail}>
                        <div>
                            <TextField label="Book Name"
                                       variant="outlined"
                                       defaultValue={this.props.bookInfo.name}
                                       className={classes.box}
                                       onChange={this.onNameChange.bind(this)}
                            />
                            <TextField label="Author Name"
                                       variant="outlined"
                                       defaultValue={this.props.bookInfo.author}
                                       className={classes.box}
                                       onChange={this.onAuthorChange.bind(this)}
                            />
                        </div>
                        <div>
                            <TextField label="Price"
                                       variant="outlined"
                                       defaultValue={(this.props.bookInfo.price/100).toFixed(2)}
                                       className={classes.box}
                                       onChange={this.onPriceChange.bind(this)}
                            />
                            <TextField label="Stock"
                                       variant="outlined"
                                       defaultValue={this.props.bookInfo.storage.toFixed(0)}
                                       className={classes.box}
                                       onChange={this.onStockChange.bind(this)}
                            />
                        </div>
                        <div>
                            <TextField label="Category"
                                       variant="outlined"
                                       defaultValue={this.props.bookInfo.category}
                                       className={classes.box}
                                       onChange={this.onCategoryChange.bind(this)}
                            />
                        </div>
                        <TextField label="Introduction"
                                   variant="outlined"
                                   defaultValue={this.props.bookInfo.intro}
                                   multiline
                                   rows={10}
                                   className={classes.introBox}
                                   onChange={this.onIntroductionChange.bind(this)}
                        />
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
        return(
            <Grid container spacing={5} className={classes.root}>
                <Grid item xs={5}>
                    <img alt={"bookPicture"} src={this.props.bookInfo.image} width={"100%"}/>
                </Grid>
                <Grid item xs={5} className={classes.detail}>
                    <Typography variant={"h4"} className={classes.bookName}>{this.props.bookInfo.name}</Typography>
                    <Typography variant={"h6"}>Author: {this.props.bookInfo.author}</Typography>
                    <Typography variant={"h6"}>Category: {this.props.bookInfo.category}</Typography>
                    <Typography variant={"h6"}>
                        <span>Price: </span>
                        <span className={classes.price}>￥{(this.props.bookInfo.price/100).toFixed(2)}</span>
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