import React from 'react';
import {Router, Route, Redirect} from 'react-router-dom';
import history from './utils/history'

import Frame from "./view/Frame";
import LoginView from "./view/LoginView";

const nullUser = {
    isAuthed: false,
    userName: null,
    avatarPath: null,
};

class MainRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: nullUser,
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(loginUser){
        this.setState({
            user: loginUser,
        })

    }

    logout(){
        this.setState(() => ({
            user: nullUser,
        }));
    }

    render() {
        return(
            <Router history={history}>
                <Route exact path={"/"}>
                    <Redirect to={{pathname: "/store"}}/>
                </Route>
                <Route path={"/store"}>
                    <Frame user={this.state.user}
                           askForLogout={this.logout}
                    />
                </Route>
                <Route exact path={"/login"}>
                    <LoginView login={this.login}/>
                </Route>
            </Router>
        );
    };

}

export default MainRouter;