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



const styles = theme => ({
    root: {
        marginTop: 20,
    },
    checkbox: {
        marginTop: 80,
        marginLeft: "2vw",
    },
    bookimg: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: "4vw",
    },
    bookname: {
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

class OrderItem extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={1}>

                    </Grid>
                    <Grid item xs={3}>
                        <img alt={this.props.itemData.name} src={this.props.itemData.image} height={"180px"}
                             className={classes.bookimg}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography component="h5" variant="h5" className={classes.bookname}>
                            {this.props.itemData.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {this.props.itemData.author}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            Category: {this.props.itemData.category}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">

                        </Typography>
                        <Typography variant="h5" className={classes.price}>
                            ￥{this.props.itemData.price.toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={classes.priceCalculate}>
                            ￥{this.props.itemData.price.toFixed(2)} × {this.props.bookNum} = ￥{(this.props.itemData.price * this.props.bookNum).toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>

                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default withStyles(styles)(OrderItem);