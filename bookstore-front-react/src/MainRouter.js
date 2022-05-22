import React from 'react';
import {Router, Route, Redirect} from 'react-router-dom';
import history from './utils/history'

import Frame from "./view/Frame";
import LoginView from "./view/LoginView";
import SignupView from "./view/SignupView";
import {autoLogin, getVisitCount, logout} from "./services/UserService";
import {clearCookie} from "./utils/cookie";
import {config} from "./config";

const nullUser = {
    userId: -1,
    isAuthed: false,
    username: null,
    avatar: null,
    userType: null,
    userInfo: null,
};

// eslint-disable-next-line no-unused-vars
const testUser = {
    userId: 3,
    isAuthed: true,
    username: "admin",
    password: "admin",
    avatar: require("./assets/userimage1.jpg").default,
    userType: 1,
    userInfo: {
        userId: 3,
        nickname: "swh",
        name: "沈玮杭",
        tel: "10086",
        address: "sjtu",
        email: "shenwhang@outlook.com",
    }
}

class MainRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: nullUser,
            visitCount: 0,
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        autoLogin((user) => {
            if (user.userId !== -1) {
                this.login({
                    userId: user.userId,
                    isAuthed: true,
                    username: user.username,
                    avatar: `${config.apiUrl}/avatar/${user.userId}`,
                    userType: user.userType,
                    userInfo: user.userInfo,
                });
            }
        });
        getVisitCount((data) => {
            if (data) {
                this.setState({
                    visitCount: data,
                });
            }
        });
    }

    login(_user){
        this.setState({
            user: _user,
        });
    };

    logout(){
        logout((data) => {})
        clearCookie();
        this.setState({
            user: nullUser,
        });
    };

    render() {
        return(
            <Router history={history}>
                <Route path={"/store"}>
                    <Frame user={this.state.user}
                           logout={this.logout}
                           visitCount={this.state.visitCount}
                    />
                </Route>
                <Route exact path={"/login"}>
                    <LoginView login={this.login} user={this.state.user}/>
                </Route>
                <Route exact path={"/signup"}>
                    <SignupView login={this.login} user={this.state.user}/>
                </Route>
                <Route>
                    <Redirect to={{pathname: "/store"}}/>
                </Route>
            </Router>
        );
    };
}

export default MainRouter;
