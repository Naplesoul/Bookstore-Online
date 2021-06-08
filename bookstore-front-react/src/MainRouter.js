import React from 'react';
import {Router, Route, Redirect} from 'react-router-dom';
import history from './utils/history'

import Frame from "./view/Frame";
import LoginView from "./view/LoginView";
import SignupView from "./view/SignupView";

const nullUser = {
    userId: -1,
    isAuthed: false,
    username: null,
    avatar: null,
    userType: null,
    userInfo: null,
};

const testUser = {
    userId: 1,
    isAuthed: true,
    username: "admin",
    password: "admin",
    avatar: require("./assets/userimage1.jpg").default,
    userType: 0,
    userInfo: {
        userId: 1,
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
            user: testUser,
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(_user){
        this.setState({
            user: _user,
        });
    };

    logout(){
        this.setState({
            user: nullUser,
        });
    };

    render() {
        return(
            <Router history={history}>
                <Route exact path={"/"}>
                    <Redirect to={{pathname: "/store"}}/>
                </Route>
                <Route path={"/store"}>
                    <Frame user={this.state.user}
                           logout={this.logout}
                    />
                </Route>
                <Route exact path={"/login"}>
                    <LoginView login={this.login}/>
                </Route>
                <Route exact path={"/signup"}>
                    <SignupView login={this.login}/>
                </Route>
            </Router>
        );
    };

}

export default MainRouter;