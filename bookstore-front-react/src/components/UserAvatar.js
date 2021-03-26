import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from "@material-ui/core/Typography";
import AccountCircle from '@material-ui/icons/AccountCircle';
import {withStyles} from "@material-ui/core/styles";

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    name: {
        marginTop: theme.spacing(2.3),
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    }
})

class UserAvatar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isAuth: this.props.isAuth,
            name: this.props.isAuth ? this.props.name : null,
            avatarPath: this.props.isAuth ? this.props.avatarPath : null,
            anchorEl: null,
        };
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    openMenu = (event) => {
        this.setState({anchorEl: event.currentTarget});
    };

    closeMenu = () => {
        this.setState({anchorEl: null});
    };

    login = () => {
        this.setState({isAuth: true});
    };

    logout = () => {
        this.setState({isAuth: false, anchorEl: null});
    }

    render() {
        const { classes } = this.props;
        if (this.state.isAuth){
            return(
                <div className={classes.root}>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={this.openMenu}
                            color="inherit"
                        >
                            <Avatar className={classes.avatar} alt="userImage" src={require("../assets/userimage1.jpg")}/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.closeMenu}
                        >
                            <MenuItem onClick={this.closeMenu}>My Profile</MenuItem>
                            <MenuItem onClick={this.logout}>Logout</MenuItem>
                        </Menu>
                    </div>
                    <Typography variant="h7" noWrap className={classes.name}>
                        {this.state.name}
                    </Typography>
                </div>
            );
        } else {
            return (
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.login}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
            );
        }
    }
}

export default withStyles(styles)(UserAvatar);