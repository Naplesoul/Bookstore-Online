import React from "react";
import {withStyles} from "@material-ui/core/styles";
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";



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
                        <img alt={this.props.orderItem.bookName} src={this.props.orderItem.image} height={"180px"}
                             className={classes.bookimg}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography component="h5" variant="h5" className={classes.bookname}>
                            {this.props.orderItem.bookName}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {this.props.orderItem.author}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            分类： {this.props.orderItem.category}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">

                        </Typography>
                        <Typography variant="h5" className={classes.price}>
                            ￥{(this.props.orderItem.bookPrice/100).toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" className={classes.priceCalculate}>
                            ￥{(this.props.orderItem.bookPrice/100).toFixed(2)} × {this.props.orderItem.bookNum} = ￥{(this.props.orderItem.bookPrice * this.props.orderItem.bookNum/100).toFixed(2)}
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