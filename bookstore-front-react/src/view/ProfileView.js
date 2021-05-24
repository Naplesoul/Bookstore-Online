import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Redirect} from "react-router-dom";



const styles = theme => ({

});

class CartView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.user.isAuthed)
            return (
                <Redirect to={{pathname: "/store"}}/>
            );
        return(
            <h1>this is Profile page</h1>
        );
    }
}

export default withStyles(styles)(CartView);