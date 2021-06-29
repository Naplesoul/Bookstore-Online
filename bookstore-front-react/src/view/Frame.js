import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";

import {getBooks} from "../services/BookService";
import HeaderBar from "../components/HeaderBar";
import LeftDrawer from "../components/LeftDrawer";
import HomeView from "./HomeView";
import BrowseView from "./BrowseView";
import InfoView from "./InfoView";
import CartView from "./CartView";
import OrderView from "./OrderView";
import {getOrders} from "../services/OrderService";
import ProfileView from "./ProfileView";
import BookManagementView from "./BookManagementView";
import UserManagementView from "./UserManagementView";
import UserStatisticsView from "./UserStatisticsView";
import AdminStatisticsView from "./AdminStatisticsView";

// let _bookData = [
//     {bookId: 0, isbn: 0, bookName: "The Lord of the Rings", author: "J. R. R. Tolkien", category: "novel", price: 45.90, storage: 500, intro: "The book is a sequel to \"The Hobbit\" and is recognized as the originator of modern fantasy literature. ", image: require("../assets/book0.jpg").default},
// ];
//
//
// let _cartData = [
//     {bookId: 0, bookNum: 5, chosen: true, bookName: "The Lord of the Rings", author: "J. R. R. Tolkien", category: "novel", price: 45.90, storage: 500, image: require("../assets/book0.jpg").default},
// ];

const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: theme.spacing(8),
    },

});




class Frame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookData: [],
            cartData: [],
            infoBookId: 1,
            redirectPath: null,
            searchText: null,
        };
    }

    redirectTo(path) {
        this.setState({
            redirectPath: path,
        });
    }

    setBookData(_bookData) {
        this.setState({
            bookData: _bookData,
        });
    }

    setCartData(_cartData) {
        this.setState({
            cartData: _cartData,
        });
    }

    setInfoBook(bookId) {
        this.setState({
            infoBookId: bookId,
        });
    }

    setSearchText(_text) {
        this.setState({
            searchText: _text,
        });
    }



    render() {
        if (this.state.redirectPath){
            let path = this.state.redirectPath;
            this.setState({
                redirectPath: null,
            });
            return(
                <Redirect to={{pathname: path}}/>
            );
        }
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <CssBaseline/>
                <HeaderBar
                    user={this.props.user}
                    setSearchText={this.setSearchText.bind(this)}
                    redirectTo={this.redirectTo.bind(this)}
                    logout={this.props.logout}
                />
                <LeftDrawer
                    user={this.props.user}
                    redirectTo={this.redirectTo.bind(this)}
                    cartData={this.state.cartData}
                    setSearchText={this.setSearchText.bind(this)}
                />
                <main className={classes.content}>
                    <Router>
                        <Route exact path={"/store"}>
                            <HomeView setInfoBook={this.setInfoBook.bind(this)}
                                      redirectTo={this.redirectTo.bind(this)}
                            />
                        </Route>
                        <Route exact path={"/store/books"}>
                            <BrowseView setInfoBook={this.setInfoBook.bind(this)}
                                        redirectTo={this.redirectTo.bind(this)}
                                        searchText={this.state.searchText}
                            />
                        </Route>
                        <Route exact path={"/store/info"}>
                            <InfoView bookId={this.state.infoBookId}
                                      user={this.props.user}
                                      cartData={this.state.cartData}
                                      redirectTo={this.redirectTo.bind(this)}
                                      setCartData={this.setCartData.bind(this)}
                            />
                        </Route>
                        <Route exact path={"/store/cart"}>
                            <CartView user={this.props.user}
                                      // bookData={this.state.bookData}
                                      cartData={this.state.cartData}
                                      // setBookData={this.setBookData.bind(this)}
                                      setCartData={this.setCartData.bind(this)}
                            />
                        </Route>
                        <Route exact path={"/store/orders"}>
                            <OrderView user={this.props.user}
                            />
                        </Route>
                        <Route exact path={"/store/profile"}>
                            <ProfileView user={this.props.user}
                            />
                        </Route>
                        <Route exact path={"/store/statistics"}>
                            <UserStatisticsView user={this.props.user}
                            />
                        </Route>
                        <Route exact path={"/store/management/books"}>
                            <BookManagementView user={this.props.user}
                                                bookData={this.state.bookData}
                                                setBookData={this.setBookData.bind(this)}
                            />
                        </Route>
                        <Route exact path={"/store/management/users"}>
                            <UserManagementView user={this.props.user}/>
                        </Route>
                        <Route exact path={"/store/management/statistics"}>
                            <AdminStatisticsView user={this.props.user}
                            />
                        </Route>
                    </Router>
                </main>
            </div>
        );
    }
};

export default withStyles(styles)(Frame);