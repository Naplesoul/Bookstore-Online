import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import book1 from '../assets/book2.jpg'

const useStyles = makeStyles({
    root: {
        width: 240,
        height: 335,
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
    },
    buttonArea: {
        padding: 0,
        marginLeft: 20,
        marginTop: 5,
    },
    cartButton: {
        backgroundColor: '#ffdea3',
        color: 'black',
        marginRight: 20,
    },
    buyButton: {
        backgroundColor: '#ea5a5a',
        color: 'black',
    },
});

export default function BookCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={book1}
                    title="book1"
                />
                <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h6" component="h7">
                        Lizard
                    </Typography>
                    <Typography variant="body2" component="p" className={classes.price}>
                        ￥79.99
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.buttonArea}>
                <Button size="small" className={classes.cartButton}>
                    Add to Cart
                </Button>
                <Button size="small" className={classes.buyButton}>
                    Buy Now
                </Button>
            </CardActions>
        </Card>
    );
}