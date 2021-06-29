import React from "react";
import {withStyles} from "@material-ui/core/styles";
import BookCard from "../components/BookCard";
import GridList from '@material-ui/core/GridList';
import { Pagination } from 'antd';
import 'antd/dist/antd.css'
import {getBookCount, getBooks} from "../services/BookService";


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
        };

        getBooks(1, 15, this.props.searchText, (_bookData) => {
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
        getBooks(_page, _pageSize, this.props.searchText, (_bookData) => {
            this.setState({
                bookCount: _bookData.totalElements,
                bookData: _bookData.content,
            });
        });
    }

    render() {
        // if (this.state.bookData.length === 0) {
        //     return (
        //         <h1>
        //             加载中，请稍候...
        //         </h1>
        //     );
        // }
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <GridList cellHeight={160} className={classes.gridList} cols={3}>
                    {this.state.bookData.map((book, index) => {
                        return <BookCard bookInfo={book} clickBook={this.clickBook.bind(this)} />;
                    })}
                </GridList>
                <div className={classes.page}>
                    <Pagination defaultCurrent={1}
                                total={this.state.bookCount}
                                defaultPageSize={15}
                                onChange={this.setPage.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(BrowseView);