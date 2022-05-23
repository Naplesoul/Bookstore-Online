import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {getReduplicateUsername, signup} from "../services/UserService";
import {config} from "../config";
import {checkEmail} from "../utils/inputCheck";
import {RedirectUtil} from "../components/RedirectUtil";

const duplicateHelpText = "该用户名已被占用"

const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${config.apiUrl}/bookImage/0)`,
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

class SignupView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectPath: null,
            duplicateUsername: false,
            helpText: "",
        }
    };

    submit() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        let email = document.getElementById("email").value;
        if (username === "" || password === "" || confirmPassword === "" || email === "") {
            alert("信息不完整，请继续填写");
            return;
        }
        if (password !== confirmPassword) {
            alert("两次输入的密码不匹配，请重新输入");
            return;
        }
        if (password.length < 6) {
            alert("密码长度至少为6位");
            return;
        }
        if (!checkEmail(email)) {
            alert("邮件地址不合法，请重新输入");
            return;
        }
        if (username.indexOf(":") !== -1 || username.indexOf("：") !== -1 || username.indexOf("*") !== -1
            || username.indexOf("/") !== -1 || username.indexOf("\\") !== -1
            || username.indexOf("!") !== -1 || username.indexOf("?") !== -1
            || username.indexOf("&") !== -1 || username.indexOf("|") !== -1) {
            alert("用户名中不能包含 : * ! ? 等特殊字符");
            return;
        }
        signup(username, password, email, (data) => {
            if (data.userId === -1)
                alert("用户名已被占用");
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
        });
    }

    onKeyDown(e) {
        if (e.keyCode === 13) {
            this.submit();
        }
    }

    onUsernameChange(e) {
        getReduplicateUsername(e.target.value, (data) => {
            if (data) {
                this.setState({
                    duplicateUsername: true,
                    helpText: duplicateHelpText,
                });
            } else {
                this.setState({
                    duplicateUsername: false,
                    helpText: "",
                });
            }
        });
    }

    componentDidMount() {
        if (this.props.user && this.props.user.isAuthed) {
            alert("您已登录。如需注册新账号，请先退出")
            this.setState({
                redirectPath: "/store",
            });
        }
    }

    render() {
        if(this.state.redirectPath){
            let path = this.state.redirectPath;
            return(
                <RedirectUtil to={{pathname: path}} reset={()=>{this.setState({redirectPath: null})}}/>
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
                            注册
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
                                error={this.state.duplicateUsername}
                                onChange={this.onUsernameChange.bind(this)}
                                helperText={this.state.helpText}
                                autoFocus
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
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="确认密码"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                label="邮箱"
                                type="email"
                                id="email"
                                onKeyDown={this.onKeyDown.bind(this)}
                            />
                            <Button
                                // type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.submit.bind(this)}
                                className={classes.submit}
                            >
                                注册
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link variant="body2" onClick={()=>{this.setState({redirectPath: "/login"})}}>
                                        已有账号？点此登录
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

export default withStyles(styles)(SignupView);
