import React from "react";
import {withStyles} from "@material-ui/core/styles";
import AdsCarousel from "../components/AdsCarousel";
import BrowseView from "./BrowseView";



const styles = theme => ({

});

class HomeView extends React.Component {
    render() {
        const { classes } = this.props;
        return(
            <div>
                <AdsCarousel/>
                <BrowseView/>
            </div>
        );
    }
}

export default withStyles(styles)(HomeView);