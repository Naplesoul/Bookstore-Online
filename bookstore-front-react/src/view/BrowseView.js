import React from "react";
import {withStyles} from "@material-ui/core/styles";
import BookCard from "../components/BookCard";
import GridList from '@material-ui/core/GridList';
import { Pagination } from 'antd';
import 'antd/dist/antd.css'


const styles = theme => ({
    root: {

    },
    page: {
        marginLeft: '33vw',
    },
});

class BrowseView extends React.Component {
    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <GridList cellHeight={160} className={classes.gridList} cols={3}>
                    <BookCard/>
                    <BookCard/>
                    <BookCard/>
                    <BookCard/>
                    <BookCard/>
                    <BookCard/>
                </GridList>
                <div className={classes.page}>
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(BrowseView);