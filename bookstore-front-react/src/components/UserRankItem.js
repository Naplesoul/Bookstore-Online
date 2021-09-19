import React from "react";
import {withStyles} from "@material-ui/core/styles";
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";



const styles = theme => ({
    root: {
    },
    index: {
        marginTop: 30,
        marginLeft: "3vw",
    },
    price: {
        marginTop: 10,
        color: "red",
    },
});

class UserRankItem extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    };

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <Typography component="h5" variant="h5" className={classes.index}>
                            {this.props.index}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography component="h5" variant="h5">
                            {this.props.user.username}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            用户ID：{this.props.user.userId}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            昵称：{this.props.user.userInfo.nickname}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            姓名：{this.props.user.userInfo.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography component="h6" variant="h6">
                             用户信息
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            电话：{this.props.user.userInfo.tel}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            邮箱：{this.props.user.userInfo.email}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            收货地址：{this.props.user.userInfo.address}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography component="h6" variant="h6">
                            消费金额
                        </Typography>
                        <Typography variant="h5" className={classes.price}>
                            ￥{(this.props.consumption/100).toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default withStyles(styles)(UserRankItem);
