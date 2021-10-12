import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';
import { InputNumber } from 'element-react';
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from '@material-ui/icons/Clear';
import {config} from "../config";



const styles = theme => ({
    root: {
      marginTop: 20,
    },
    checkbox: {
        marginTop: 80,
        marginLeft: "2vw",
    },
    bookImg: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: "4vw",
    },
    bookName: {
        marginTop: 35,
    },
    price: {
        marginTop: 10,
        color: "red",
    },
    priceCalculate: {
        color: "red",
        marginTop: 60,
        marginLeft: "2.8vw",
    },
    num: {
        marginTop: 30,
        marginLeft: "3vw",
    },
    remove: {
        marginTop: 80,
    },
});

class CartItem extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    };

    onNumberChange(value) {
        if(isNaN(value)) {
            return;
        }
        this.props.onNumberChange(this.props.itemData.bookId, value);
    };

    remove() {
        this.props.remove(this.props.itemData.bookId);
    };

    choose() {
        this.props.choose(this.props.itemData.bookId);
    };

    render() {
        const { classes } = this.props;
        return(
            <Card className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        <Checkbox
                            className={classes.checkbox}
                            checked={this.props.itemData.chosen}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            onClick={this.choose.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <img alt={this.props.itemData.name} src={`${config.apiUrl}/bookImage?bookId=` + this.props.itemData.bookId} height={"180px"}
                             className={classes.bookImg}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography component="h5" variant="h5" className={classes.bookName}>
                            {this.props.itemData.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {this.props.itemData.author}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            Category: {this.props.itemData.category}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            Stock: {this.props.itemData.storage}
                        </Typography>
                        <Typography variant="h5" className={classes.price}>
                            ￥{(this.props.itemData.price/100).toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={classes.priceCalculate}>
                            ￥{(this.props.itemData.price/100).toFixed(2)} × {this.props.itemData.bookNum} = ￥{(this.props.itemData.price * this.props.itemData.bookNum/100).toFixed(2)}
                        </Typography>
                        <InputNumber defaultValue={this.props.itemData.bookNum} onChange={this.onNumberChange.bind(this)}
                                     min="1" max={this.props.itemData.storage.toString()}
                                     className={classes.num}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton className={classes.remove} onClick={this.remove.bind(this)}>
                            <ClearIcon/>
                        </IconButton>
                    </Grid>
                </Grid>

            </Card>
        );
    }
}

export default withStyles(styles)(CartItem);
