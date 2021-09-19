import React from "react";
import {withStyles} from "@material-ui/core/styles";
import BookCard from "../components/BookCard";
import GridList from '@material-ui/core/GridList';
import { Pagination } from 'antd';
import 'antd/dist/antd.css'
import {getBooks} from "../services/BookService";
import {config} from "../config";

const pageSize = 15;

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

        this.state = {
            bookCount: 0,
            bookData: [],
            page: 1,
        };
    }

    componentDidMount() {
        getBooks(1, pageSize, config.bookName, this.props.searchText, (_bookData) => {
            this.setState({
                bookCount: _bookData.totalElements,
                bookData: _bookData.content,
            });
        });
    }

    clickBook(bookId) {
        this.props.setInfoBook(bookId);
        this.props.redirectTo("/store/info");
    }

    setPage(_page, _pageSize) {
        getBooks(_page, pageSize, config.bookName, this.props.searchText, (_bookData) => {
            this.setState({
                bookCount: _bookData.totalElements,
                bookData: _bookData.content,
                page: _page,
            });
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <GridList cellHeight={160} className={classes.gridList} cols={3}>
                    {this.state.bookData.map((book) => {
                        return <BookCard bookInfo={book} clickBook={this.clickBook.bind(this)} key={book.bookId} />;
                    })}
                </GridList>
                <div className={classes.page}>
                    <Pagination current={this.state.page}
                                total={this.state.bookCount}
                                defaultPageSize={pageSize}
                                onChange={this.setPage.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(BrowseView);
