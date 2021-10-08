import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";

import HeaderBar from "../components/HeaderBar";
import LeftDrawer from "../components/LeftDrawer";
import HomeView from "./HomeView";
import BrowseView from "./BrowseView";
import InfoView from "./InfoView";
import CartView from "./CartView";
import OrderView from "./OrderView";
import ProfileView from "./ProfileView";
import BookManagementView from "./BookManagementView";
import UserManagementView from "./UserManagementView";
import UserStatisticsView from "./UserStatisticsView";
import AdminStatisticsView from "./AdminStatisticsView";
import ChatRoomView from "./ChatRoomView";
import {chatService} from "../services/ChatService";
import {config} from "../config";

// let _bookData = [
//     {bookId: 0, ISBN: 0, bookName: "The Lord of the Rings", author: "J. R. R. Tolkien", category: "novel", price: 45.90, storage: 500, intro: "The book is a sequel to \"The Hobbit\" and is recognized as the originator of modern fantasy literature. ", image: require("../assets/book0.jpg").default},
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
            cartData: [],
            newMessageCount: 0,
            messages: [],
            infoBookId: 1,
            redirectPath: "/store",
            searchText: null,
        };
        chatService.registerNewMessageListener("Frame", this.addMessage.bind(this));
    }

    redirectTo(path) {
        this.setState({
            redirectPath: path,
        });
    }

    refresh() {
        this.redirectTo(window.location.pathname);
    }

    addMessage(msg) {
        const newMsg = { date: new Date() };
        switch (msg.messageType) {
            case 'text':
                newMsg.position = msg.userId ? 'left' : 'right';
                newMsg.type = 'text';
                newMsg.text = msg.message;
                newMsg.title = msg.userId ? (msg.userType === 1 ? "管理员" : msg.username) : "您";
                newMsg.avatar = `${config.apiUrl}/getAvatar?userId=${msg.userId ? msg.userId : this.props.user.userId}`
                break;
            case 'leave':
                newMsg.type = 'system';
                newMsg.text = `${msg.userId === this.props.user.userId ? "您" : (msg.userType === 1 ? "管理员" : msg.username)} 离开了聊天室`;
                break;
            case 'join':
                newMsg.type = 'system';
                newMsg.text = `${msg.userId === this.props.user.userId ? "您" : (msg.userType === 1 ? "管理员" : msg.username)} 加入了聊天室`;
                break;
            default:
        }
        const messages = this.state.messages;
        messages.push(newMsg);
        this.setState({ messages });
        if (window.location.pathname !== "/store/chatRoom") {
            this.setState({ newMessageCount: this.state.newMessageCount + 1 });
        }
    }

    clearNewMessageCount() {
        this.setState({ newMessageCount: 0 });
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
                    newMessageCount={this.state.newMessageCount}
                    visitCount={this.props.visitCount}
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
                        <Route exact path={"/store/chatRoom"}>
                            <ChatRoomView user={this.props.user}
                                          messages={this.state.messages}
                                          addMessage={this.addMessage.bind(this)}
                                          clearNewMessageCount={this.clearNewMessageCount.bind(this)}
                            />
                        </Route>
                        <Route exact path={"/store/cart"}>
                            <CartView user={this.props.user}
                                      cartData={this.state.cartData}
                                      setCartData={this.setCartData.bind(this)}
                            />
                        </Route>
                        <Route exact path={"/store/orders"}>
                            <OrderView user={this.props.user}
                            />
                        </Route>
                        <Route exact path={"/store/profile"}>
                            <ProfileView user={this.props.user}
                                         refresh={this.refresh.bind(this)}
                            />
                        </Route>
                        <Route exact path={"/store/statistics"}>
                            <UserStatisticsView user={this.props.user}
                            />
                        </Route>
                        <Route exact path={"/store/management/books"}>
                            <BookManagementView user={this.props.user}/>
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
}

export default withStyles(styles)(Frame);
