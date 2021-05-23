import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


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
    price: {
        color: 'red',
        marginBottom: 10,
    },
});

class BookCard extends React.Component {
    constructor(props) {
        super(props);
    }

    clickBook() {
        this.props.clickBook(this.props.bookInfo.id)
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.root} onClick={this.clickBook.bind(this)}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={this.props.bookInfo.image}
                        title={this.props.bookInfo.name}
                    />
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h6" component="h7">
                            {this.props.bookInfo.name}
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