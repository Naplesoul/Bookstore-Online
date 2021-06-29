import React from "react";
import {withStyles} from "@material-ui/core/styles";
import AdsCarousel from "../components/AdsCarousel";
import BrowseView from "./BrowseView";



const styles = theme => ({

});

class HomeView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <AdsCarousel/>
                <BrowseView  setInfoBook={this.props.setInfoBook}
                             redirectTo={this.props.redirectTo}
                             searchText={null}
                />
            </div>
        );
    }
}

export default withStyles(styles)(HomeView);