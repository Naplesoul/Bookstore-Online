import React from "react";
import {withStyles} from "@material-ui/core/styles";



const styles = theme => ({

});

class HomeView extends React.Component {
    render() {
        return(
            <h1>this is home page</h1>
        );
    }
}

export default withStyles(styles)(HomeView);