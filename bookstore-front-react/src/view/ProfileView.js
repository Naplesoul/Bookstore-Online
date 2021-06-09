import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
    root: {
        width: "98%",
        marginLeft: "10vw",
        marginTop: "6vh",
    },
    detail: {
        marginLeft: "2vw",
        // backgroundColor: "black"
    },
});

class CartView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid container spacing={5} className={classes.root}>
                <Grid item xs={4}>
                    <img alt={"userAvatar"} src={this.props.user.avatar} width={"70%"}/>
                </Grid>
                <Grid item xs={5} className={classes.detail}>
                    <Typography variant={"h4"} className={classes.bookName}>{this.props.user.username}</Typography>
                    <Typography variant={"h6"}>用户ID： {this.props.user.userId}</Typography>
                    <Typography variant={"h6"}>昵称： {this.props.user.userInfo.nickname}</Typography>
                    <Typography variant={"h6"}>姓名： {this.props.user.userInfo.name}</Typography>
                    <Typography variant={"h6"}>邮箱： {this.props.user.userInfo.email}</Typography>
                    <Typography variant={"h6"}>电话： {this.props.user.userInfo.tel}</Typography>
                    <Typography variant={"h6"}>收货地址： {this.props.user.userInfo.address}</Typography>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(CartView);