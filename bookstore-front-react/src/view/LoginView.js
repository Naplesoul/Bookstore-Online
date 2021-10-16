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
import {login} from "../services/UserService";
import {config} from "../config";


const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://api.dujin.org/bing/1920.php)',
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
        }
    };

    submit() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        if (username === "" || password === "") {
            alert("请填写用户名和密码");
            return;
        }
        login(username, password, (data) => {
            if (data.userId === -1)
                alert("用户名或密码错误");
            else if (data.userType === -1)
                alert("您的账号已被禁用")
            else {
                this.props.login({
                    userId: data.userId,
                    isAuthed: true,
                    username: data.username,
                    avatar: `${config.apiUrl}/avatar/${data.userId}`,
                    userType: data.userType,
                    userInfo: data.userInfo,
                });
                this.setState({
                    redirectPath: "/store",
                })
            }
        })
    };

    onKeyDown(e) {
        if (e.keyCode === 13) {
            this.submit();
        }
    }

    componentDidMount() {
        if (this.props.user && this.props.user.isAuthed) {
            alert("您已登录。如需切换账号，请先退出")
            this.setState({
                redirectPath: "/store",
            });
        }
    }

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
                            登录
                        </Typography>
                        <form className={classes.form}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="用户名"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onKeyDown={this.onKeyDown.bind(this)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="密码"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onKeyDown={this.onKeyDown.bind(this)}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="记住我"
                            />
                            <Button
                                // type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.submit.bind(this)}
                                className={classes.submit}
                            >
                                登录
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link variant="body2" href={"/signup"}>
                                        注册
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
