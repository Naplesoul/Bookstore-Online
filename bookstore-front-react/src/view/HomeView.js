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

    clickBook(id) {
        this.props.clickBook(id);
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <AdsCarousel/>
                <BrowseView  bookData={this.props.bookData}
                             clickBook={this.clickBook.bind(this)}
                />
            </div>
        );
    }
}

export default withStyles(styles)(HomeView);