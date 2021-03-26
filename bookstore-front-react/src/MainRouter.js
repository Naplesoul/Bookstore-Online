import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// import LoginView from './view/LoginView';
import Frame from "./view/Frame";
import LoginView from "./view/LoginView";

class MainRouter extends React.Component {

    render() {
        return(
            <Router>
                    <Route exact path={"/"}><Frame/></Route>
                    <Route exact path={"/login"}><LoginView/></Route>
            </Router>
        );
    };

}

export default MainRouter;