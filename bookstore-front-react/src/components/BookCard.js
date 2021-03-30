import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import book1 from '../assets/book2.jpg'

const useStyles = makeStyles({
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
                        Effective C++
                    </Typography>
                    <Typography variant="body2" component="p" className={classes.price}>
                        ￥79.99
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}