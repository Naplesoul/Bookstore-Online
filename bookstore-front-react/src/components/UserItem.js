import React from "react";
import {withStyles} from "@material-ui/core/styles";
import 'fontsource-roboto';
import {setUserType} from "../services/UserService";



const styles = theme => ({
    userId: {
        width: "2vw",
    },
    username: {
        width: "7vw",
    },
    nickname: {
        width: "7vw",
    },
    name: {
        width: "7vw",
    },
    email: {
        width: "15vw",
    },
    tel: {
        width: "10vw",
    },
    address: {
        width: "18vw",
    },
    status: {
        width: "4vw",
    },
});

class BookItem extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    };

    setUserType() {
        let type = (this.props.user.userType === -1) ? 0 : -1;
        setUserType(this.props.user.userId, type, (data) => {
            if (data) {
                this.props.setUserType(this.props.user.userId, type);
                alert("修改成功");
            } else {
                alert("修改失败");
            }
        })
    }

    renderButton() {
        let op = (this.props.user.userType === -1) ? "解禁" : "封禁";
        if (this.props.user.userId === this.props.operatingUser.userId
            || this.props.user.userType === 1) {
            return (
                <td>
                    <button onClick={this.setUserType.bind(this)} disabled>
                        {op}
                    </button>
                </td>
            );
        } else {
            return (
                <td>
                    <button onClick={this.setUserType.bind(this)}>
                        {op}
                    </button>
                </td>
            );
        }
    }

    render() {
        let status = "";
        if (this.props.user.userType === -1) {
            status = "已封禁";
        } else if (this.props.user.userType === 0) {
            status = "正常";
        } else if (this.props.user.userType === 1) {
            status = "管理员";
        }
        const { classes } = this.props;
        return(
            <tr className={classes.root}>
                <td>
                    <input value={this.props.user.userId}
                           className={classes.userId}
                           disabled
                    />
                </td>
                <td>
                    <input value={this.props.user.username}
                           className={classes.username}
                           disabled
                    />
                </td>
                <td>
                    <input value={this.props.user.userInfo.nickname}
                           className={classes.nickname}
                           disabled
                    />
                </td>
                <td>
                    <input value={this.props.user.userInfo.name}
                           className={classes.name}
                           disabled
                    />
                </td>
                <td>
                    <input value={this.props.user.userInfo.email}
                           className={classes.email}
                           disabled
                    />
                </td>
                <td>
                    <input value={this.props.user.userInfo.tel}
                           className={classes.tel}
                           disabled
                    />
                </td>
                <td>
                    <input value={this.props.user.userInfo.address}
                           className={classes.address}
                           disabled
                    />
                </td>
                <td>
                    <input value={status}
                           className={classes.status}
                           disabled
                    />
                </td>
                {this.renderButton()}
            </tr>
        );
    }
}

export default withStyles(styles)(BookItem);
