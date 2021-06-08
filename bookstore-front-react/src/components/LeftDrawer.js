import React from 'react'

import {withStyles} from "@material-ui/core/styles";
import {Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar} from "@material-ui/core";

import MenuBookIcon from '@material-ui/icons/MenuBook';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PeopleIcon from '@material-ui/icons/People';
import CartIcon from "./CartIcon";

const drawerWidth = 240;

const styles = theme => ({
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
});


class LeftDrawer extends React.Component
{
    constructor(props) {
        super(props);
    };

    goToBooks() {
        this.props.setSearchText(null);
        this.props.redirectTo("/store/books");
    }

    goToCart() {
        this.props.setSearchText(null);
        if (this.props.user.isAuthed)
            this.props.redirectTo("/store/cart");
        else
            this.props.redirectTo("/login");
    }

    goToOrders() {
        this.props.setSearchText(null);
        if (this.props.user.isAuthed)
            this.props.redirectTo("/store/orders");
        else
            this.props.redirectTo("/login");
    }

    goToProfile() {
        this.props.setSearchText(null);
        if (this.props.user.isAuthed)
            this.props.redirectTo("/store/profile");
        else
            this.props.redirectTo("/login");
    }

    goToUserStatistics() {
        this.props.setSearchText(null);
        if (this.props.user.isAuthed)
            this.props.redirectTo("/store/statistics");
        else
            this.props.redirectTo("/login");
    }

    goToBooksManage() {
        this.props.setSearchText(null);
        this.props.redirectTo("/store/management/books");
    }

    goToOrdersManage() {
        this.props.setSearchText(null);
        this.props.redirectTo("/store/orders");
    }

    goToUserManage() {
        this.props.setSearchText(null);
        this.props.redirectTo("/store/management/users");
    }

    goToStatistics() {
        this.props.setSearchText(null);
        this.props.redirectTo("/store/management/statistics");
    }

    getCartItemNum() {
        let cartItemNum = 0;
        let len = this.props.cartData.length;
        for (let i = 0; i < len; ++i)
            cartItemNum += this.props.cartData[i].bookNum;
        return cartItemNum;
    }


    render() {
        const { classes } = this.props;
        // is a normal user or have not logged in
        if (!this.props.user.isAuthed || this.props.user.userType === 0)
            return (
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
                            <ListItem button onClick={this.goToBooks.bind(this)}>
                                <ListItemIcon><MenuBookIcon/></ListItemIcon>
                                <ListItemText>图书</ListItemText>
                            </ListItem>
                            <ListItem button onClick={this.goToCart.bind(this)}>
                                <ListItemIcon>
                                    <CartIcon number={this.getCartItemNum()}/>
                                </ListItemIcon>
                                <ListItemText>购物车</ListItemText>
                            </ListItem>
                            <ListItem button onClick={this.goToOrders.bind(this)}>
                                <ListItemIcon><AssignmentIcon/></ListItemIcon>
                                <ListItemText>我的订单</ListItemText>
                            </ListItem>
                            <ListItem button onClick={this.goToProfile.bind(this)}>
                                <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                <ListItemText>我的信息</ListItemText>
                            </ListItem>
                            <ListItem button onClick={this.goToUserStatistics.bind(this)}>
                                <ListItemIcon><EqualizerIcon/></ListItemIcon>
                                <ListItemText>统计数据</ListItemText>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            );
        // is admin
        else
            return(
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
                            <ListItem button onClick={this.goToBooksManage.bind(this)}>
                                <ListItemIcon><MenuBookIcon/></ListItemIcon>
                                <ListItemText>图书管理</ListItemText>
                            </ListItem>
                            <ListItem button onClick={this.goToOrdersManage.bind(this)}>
                                <ListItemIcon><AssignmentIcon/></ListItemIcon>
                                <ListItemText>订单管理</ListItemText>
                            </ListItem>
                            <ListItem button onClick={this.goToUserManage.bind(this)}>
                                <ListItemIcon><PeopleIcon/></ListItemIcon>
                                <ListItemText>用户管理</ListItemText>
                            </ListItem>
                            <ListItem button onClick={this.goToStatistics.bind(this)}>
                                <ListItemIcon><EqualizerIcon/></ListItemIcon>
                                <ListItemText>统计数据</ListItemText>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            );

    };
}

export default withStyles(styles)(LeftDrawer);