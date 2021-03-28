import React from 'react'
import {withStyles} from "@material-ui/core/styles";
import { Carousel } from 'element-react';
import 'element-theme-default';
import book1 from '../assets/carousel/book1.jpg';
import book2 from '../assets/carousel/book2.jpg';
import book3 from '../assets/carousel/book3.jpg';
import book4 from '../assets/carousel/book4.jpg';


const styles = theme => ({
    root: {
        height: '40vh',
        width: '60vw',
        marginLeft: '10vw',
    }
});

class AdsCarousel extends React.Component{
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Carousel interval="4000" type="card" height="38vh">
                    <Carousel.Item key={1}>
                        <img alt={1} src={book1}/>
                    </Carousel.Item>
                    <Carousel.Item key={2}>
                        <img alt={2} src={book2}/>
                    </Carousel.Item>
                    <Carousel.Item key={3}>
                        <img alt={3} src={book3}/>
                    </Carousel.Item>
                    <Carousel.Item key={4}>
                        <img alt={4} src={book4}/>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}

export default withStyles(styles)(AdsCarousel);