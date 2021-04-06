import React from "react";
import {withStyles} from "@material-ui/core/styles";
import BookCard from "../components/BookCard";
import GridList from '@material-ui/core/GridList';
import { Pagination } from 'antd';
import 'antd/dist/antd.css'


const styles = theme => ({
    root: {
        marginTop: 5,
    },
    page: {
        marginLeft: '33vw',
    },
});

class BrowseView extends React.Component {
    constructor(props) {
        super(props);
    }

    clickBook(id) {
        this.props.clickBook(id);
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <GridList cellHeight={160} className={classes.gridList} cols={3}>
                    {this.props.bookData.map((item, index) => {
                        if (this.props.searchText) {
                            let searchText = this.props.searchText.toLowerCase();
                            if (item.name.toString().toLowerCase().indexOf(searchText) >= 0
                                || item.author.toString().toLowerCase().indexOf(searchText) >= 0
                                || item.category.toString().toLowerCase().indexOf(searchText) >= 0)
                                return <BookCard bookInfo={item} clickBook={this.clickBook.bind(this)} />;
                        } else {
                            return <BookCard bookInfo={item} clickBook={this.clickBook.bind(this)} />;
                        }

                    })}
                </GridList>
                <div className={classes.page}>
                    <Pagination defaultCurrent={1} total={this.props.bookData.length} defaultPageSize={15} />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(BrowseView);