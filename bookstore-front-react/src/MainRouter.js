import React from 'react';
import {Router, Route, Redirect} from 'react-router-dom';
import { createBrowserHistory } from 'history';

// import LoginView from './view/LoginView';
import Frame from "./view/Frame";
import LoginView from "./view/LoginView";

const history = createBrowserHistory();

class MainRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthed: false,
            userName: null,
            avatarPath: null,
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(userName, avatarPath){
        this.setState({
            isAuthed: true,
            userName: userName,
            avatarPath: avatarPath,
        })

    }

    logout(){
        this.setState(() => ({
            isAuthed: false,
            userName: null,
            avatarPath: null,
        }));
    }

    render() {
        return(
            <Router history={history}>
                <Route exact path={"/"}>
                    <Redirect to={{pathname: "/store"}}/>
                </Route>
                <Route path={"/store"}>
                    <Frame isAuthed={this.state.isAuthed} userName={this.state.userName} avatarPath={this.state.avatarPath}
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