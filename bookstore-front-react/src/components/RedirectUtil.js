import React from "react";
import {Redirect} from "react-router-dom";

export class RedirectUtil extends React.Component {
    constructor(props) {
        super(props);
        this.props.reset()
    }

    render() {
        return (
            <Redirect to={this.props.to}/>
        );
    }
}