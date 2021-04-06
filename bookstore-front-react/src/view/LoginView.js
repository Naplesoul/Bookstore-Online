import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(http://area.sinaapp.com/bingImg/)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
})

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectPath: null,
            userName: null,
            password: null,
        }
        this.login = this.login.bind(this);
    };

    login(){
        if (this.state.userName === "Admin" && this.state.password === "admin")
            this.props.login({isAuthed: true, userName: "Admin", avatarPath: require("../assets/userimage1.jpg").default, isAdmin: true});
        else if (this.state.userName === "User" && this.state.password === "user")
            this.props.login({isAuthed: true, userName: "User", avatarPath: require("../assets/userimage1.jpg").default, isAdmin: false});
        else
            return;
        this.setState({
            redirectPath: "/store",
        })
    };

    onUserNameChange(e) {
        this.setState({
            userName: e.target.value,
        });
    };

    onPasswordChange(e) {
        this.setState({
            password: e.target.value,
        });
    };

    render() {
        if(this.state.redirectPath){
            let path = this.state.redirectPath;
            this.setState({
                redirectPath: null,
            });
            return(
                <Redirect to={{pathname: path}}/>
            );
        }
        const { classes } = this.props;
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="userName"
                                label="User Name"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                defaultValue={this.state.userName}
                                onChange={this.onUserNameChange.bind(this)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                defaultValue={this.state.password}
                                onChange={this.onPasswordChange.bind(this)}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.login}
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(LoginView);
