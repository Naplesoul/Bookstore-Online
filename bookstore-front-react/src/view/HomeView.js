import React from "react";
import AdsCarousel from "../components/AdsCarousel";
import BrowseView from "./BrowseView";


class HomeView extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    render() {
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

export default HomeView;
