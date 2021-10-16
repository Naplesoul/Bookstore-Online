import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {config} from "../config";


const styles = theme => ({
    root: {
        width: 240,
        height: 300,
        margin: 20,
    },
    media: {
        height: 240,
    },
    content: {
        padding: 0,
        marginLeft: 20,
    },
    bookName: {
        marginBottom: 0,
    },
    price: {
        color: 'red',
        marginBottom: 10,
    },
});

class BookCard extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    clickBook() {
        this.props.clickBook(this.props.bookInfo.bookId)
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.root} onClick={this.clickBook.bind(this)}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={`${config.apiUrl}/bookImage/${this.props.bookInfo.bookId}`}
                        title={this.props.bookInfo.bookName}
                    />
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h6" component="h6" className={classes.bookName}>
                            {this.props.bookInfo.bookName}
                        </Typography>
                        <Typography variant="body2" component="p" className={classes.price}>
                            ￥{(this.props.bookInfo.price/100).toFixed(2)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}
export default withStyles(styles)(BookCard);
