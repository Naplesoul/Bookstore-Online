import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {getUsers} from "../services/UserService";
import UserItem from "../components/UserItem";

const header = [
    "ID", "用户名", "昵称", "姓名", "邮箱", "电话", "地址", "状态", "操作"
];

const styles = theme => ({
    root: {
        marginLeft: "2vw",
    },
});

class UserManagementView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
        };
        getUsers((data) => {
            if (data != null) {
                this.setState({
                    userData: data,
                });
            }
        });
    };

    setUserType(userId, userType) {
        let userData = this.state.userData;
        let len = userData.length;
        for (let i = 0; i < len; ++i) {
            if (userData[i].userId === userId) {
                userData[i].userType = userType;
                this.setState({
                    userData: userData,
                });
                return;
            }
        }
    }


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <table className={classes.table}>
                    <tr>
                        <th colSpan={2}>
                            <h2>
                                用户管理
                            </h2>
                        </th>
                    </tr>
                    <tr>
                        {header.map((head) => {
                            return (
                                <th>
                                    {head}
                                </th>
                            );
                        })}
                    </tr>
                    {this.state.userData.map((user) => {
                        return (
                            <UserItem user={user} operatingUser={this.props.user}
                                      setUserType={this.setUserType.bind(this)}
                            />
                        );
                    })}
                </table>
            </div>
        );
    }

};

export default withStyles(styles)(UserManagementView);
