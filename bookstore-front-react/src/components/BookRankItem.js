import React from "react";
import {withStyles} from "@material-ui/core/styles";
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";



const styles = theme => ({
    root: {
    },
    index: {
        marginTop: 65,
        marginLeft: "4vw",
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
    bookNum: {
        marginTop: 50,
    },
});

class BookRankItem extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        <Typography component="h5" variant="h5" className={classes.index}>
                            {this.props.index}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <img alt={this.props.book.bookName} src={this.props.book.image} height={"150px"}
                             className={classes.image}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography component="h5" variant="h5" className={classes.bookName}>
                            {this.props.book.bookName}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {this.props.book.author}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            书籍ID： {this.props.book.bookId}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            分类： {this.props.book.category}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h5" className={classes.bookNum}>
                            购买次数：{this.props.sales}
                        </Typography>
                        <Typography variant="h5" className={classes.price}>
                            ￥{(this.props.book.price/100).toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default withStyles(styles)(BookRankItem);