import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SearchIcon from '@material-ui/icons/Search';
import SvgIcon from '@material-ui/core/SvgIcon';

import UserAvatar from "../components/UserAvatar";
import HomeView from "./HomeView";
import BrowseView from "./BrowseView";
import InfoView from "./InfoView";
import OrderView from "./OrderView";
import CartView from "./CartView";
import ProfileView from "./ProfileView";

const drawerWidth = 240;


let bookData = [
    {id: 0, name: "The Lord of the Rings", author: "J. R. R. Tolkien", category: "novel", price: 45.90, storage: 500, intro: "The book is a sequel to \"The Hobbit\" and is recognized as the originator of modern fantasy literature. ", picDir: require("../assets/book0.jpg").default},
    {id: 1, name: "Le Petit Prince (The Little Prince)", author: "Antoine de Saint-Exupéry", category: "novel", price: 9.88, storage: 31, intro: "The protagonist of this book is a little prince from an alien planet. The book uses a pilot as the storyteller, telling the various adventures that the little prince went through when he set off from his own planet to the earth. ", picDir: require("../assets/book1.jpg").default},
];


let cartData = [
    {id: 0, num: 5, isChosen: true, name: "The Lord of the Rings", author: "J. R. R. Tolkien", category: "novel", price: 45.90, storage: 500, picDir: require("../assets/book0.jpg").default},
    {id: 1, num: 2, isChosen: true, name: "Le Petit Prince (The Little Prince)", author: "Antoine de Saint-Exupéry", category: "novel", price: 9.88, storage: 31, picDir: require("../assets/book1.jpg").default},
];

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#2b2d38",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },

    logo: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(3),
        cursor: "pointer",
    },

    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        color: "#98dafb",
        cursor: "pointer",
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(6),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: theme.spacing(8),
    }
});

function Logo(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}


class Frame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectPath: null,
            bookData: bookData,
            cartData: cartData,
        }
    }

    onCartNumberChange(id, num) {
        let newCartData = [];
        let len = this.state.cartData.length;
        for (let i = 0; i < len; ++i) {
            if (this.state.cartData[i].id === id) {
                this.state.cartData[i].num = num;
            }
            newCartData.push(this.state.cartData[i]);
        }
        this.setState({
            cartData: newCartData,
        })
    };

    removeCartItem(id) {
        let newCartData = [];
        let len = this.state.cartData.length;
        for (let i = 0; i < len; ++i) {
            if (this.state.cartData[i].id === id) {
                continue;
            }
            newCartData.push(this.state.cartData[i]);
        }
        this.setState({
            cartData: newCartData,
        })
    }

    chooseCartItem(id) {
        let newCartData = [];
        let len = this.state.cartData.length;
        for (let i = 0; i < len; ++i) {
            if (this.state.cartData[i].id === id) {
                this.state.cartData[i].isChosen = !this.state.cartData[i].isChosen;
            }
            newCartData.push(this.state.cartData[i]);
        }
        this.setState({
            cartData: newCartData,
        })
    }

    login(){
        this.setState({
            redirectPath: "/login",
        })
    }

    logout(){
        this.props.askForLogout();
    }

    goHome(){
        this.setState({
            redirectPath: "/store",
        })
    }

    go2Books(){
        this.setState({
            redirectPath: "/store/books",
        })
    }

    go2Cart(){
        this.setState({
            redirectPath: "/store/cart",
        })
    }

    go2Orders(){
        this.setState({
            redirectPath: "/store/orders",
        })
    }

    go2Profile(){
        this.setState({
            redirectPath: "/store/profile",
        })
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
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Logo className={classes.logo} onClick={this.goHome.bind(this)}/>
                        <Typography variant="h5" noWrap className={classes.title} onClick={this.goHome.bind(this)}>
                            eBookstore
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.avatar}>
                            <UserAvatar isAuthed={this.props.isAuthed} userName={this.props.userName} avatarPath={this.props.avatarPath}
                            askForLogin={this.login.bind(this)} askForLogout={this.logout.bind(this)}/>
                        </div>


                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <List>
                            <ListItem button onClick={this.go2Books.bind(this)}>
                                <ListItemIcon><MenuBookIcon/></ListItemIcon>
                                <ListItemText>Books</ListItemText>
                            </ListItem>
                            <ListItem button onClick={this.go2Cart.bind(this)}>
                                <ListItemIcon><ShoppingCartIcon/></ListItemIcon>
                                <ListItemText>Cart</ListItemText>
                            </ListItem>
                            <ListItem button onClick={this.go2Orders.bind(this)}>
                                <ListItemIcon><AssignmentIcon/></ListItemIcon>
                                <ListItemText>My Orders</ListItemText>
                            </ListItem>
                            <ListItem button onClick={this.go2Profile.bind(this)}>
                                <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                <ListItemText>My Profile</ListItemText>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <Router>
                        <Route exact path={"/store"}><HomeView/></Route>
                        <Route exact path={"/store/books"}><BrowseView/></Route>
                        <Route path={"/store/info/"}><InfoView/></Route>
                        <Route exact path={"/store/cart"}>
                            <CartView cartData={this.state.cartData}
                                      onNumberChange={this.onCartNumberChange.bind(this)}
                                      remove={this.removeCartItem.bind(this)}
                                      choose={this.chooseCartItem.bind(this)}
                            />
                        </Route>
                        <Route exact path={"/store/orders"}><OrderView/></Route>
                        <Route exact path={"/store/profile"}><ProfileView/></Route>
                    </Router>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(Frame);