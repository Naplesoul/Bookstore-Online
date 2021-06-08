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

        let searchText = this.props.searchText;
        let bookIndexes = [];
        let len = this.props.bookData.length;
        if (this.props.searchText == null) {
            for (let i = 0; i < len; ++i)
                bookIndexes.push(i);
        } else {
            for (let i = 0; i < len; ++i) {
                if (this.props.bookData[i].bookName.toString().toLowerCase().indexOf(searchText) >= 0
                    || this.props.bookData[i].author.toString().toLowerCase().indexOf(searchText) >= 0
                    || this.props.bookData[i].category.toString().toLowerCase().indexOf(searchText) >= 0
                    || this.props.bookData[i].isbn.toString() === searchText)
                    bookIndexes.push(i);
            }
        }

        this.state = {
            page: 1,
            pageSize: 15,
            showBookNum: bookIndexes.length,
            showBookIndexes: bookIndexes,
        };
    }

    clickBook(bookId) {
        let len = this.props.bookData.length;
        for (let i = 0; i < len; ++i) {
            if (this.props.bookData[i].bookId === bookId) {
                this.props.setInfoBookData(this.props.bookData[i]);
                this.props.redirectTo("/store/info");
            }
        }
    }

    setPage(_page, _pageSize) {
        this.setState({
            page: _page,
            pageSize: _pageSize,
        })
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <GridList cellHeight={160} className={classes.gridList} cols={3}>
                    {this.state.showBookIndexes.map((i, index) => {
                        if (index >= this.state.page *  this.state.pageSize || index < (this.state.page - 1) *  this.state.pageSize)
                            return null;
                        else
                            return <BookCard bookInfo={this.props.bookData[i]} clickBook={this.clickBook.bind(this)} />;
                    })}
                </GridList>
                <div className={classes.page}>
                    <Pagination defaultCurrent={1}
                                total={this.state.showBookNum}
                                defaultPageSize={15}
                                onChange={this.setPage.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(BrowseView);