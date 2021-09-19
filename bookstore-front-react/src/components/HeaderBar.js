import React from 'react'

import {withStyles} from "@material-ui/core/styles";
import {AppBar, Toolbar, Typography} from "@material-ui/core";

import HeaderSearchBox from "./HeaderSearchBox";
import {Logo} from "./Logo";
import UserAvatar from "./UserAvatar";

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#2b2d38",
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
});


class HeaderBar extends React.Component
{
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    };

    goToProfile() {
        this.props.redirectTo("/store/profile");
    }

    goHome() {
        this.props.redirectTo("/store");
    }

    login() {
        this.props.redirectTo("/login");
    }

    render() {
        const { classes } = this.props;
        return (
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Logo className={classes.logo} onClick={this.goHome.bind(this)}/>
                    <Typography variant="h5" noWrap className={classes.title} onClick={this.goHome.bind(this)}>
                        eBookstore
                    </Typography>
                    <HeaderSearchBox onSearchTextChange={this.props.setSearchText}
                               redirectTo={this.props.redirectTo}
                    />
                    <div className={classes.avatar}>
                        <UserAvatar user={this.props.user} go2Profile={this.goToProfile.bind(this)}
                                    askForLogin={this.login.bind(this)} askForLogout={this.props.logout}
                                    goHome={this.goHome.bind(this)}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        );
    };
}

export default withStyles(styles)(HeaderBar);
