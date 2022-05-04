import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Button, TextField} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import {image2Base64} from "../utils/image2base64";
import {setAvatar, setUserInfo} from "../services/UserService";
import {checkEmail, checkPhoneNumber} from "../utils/inputCheck";

const styles = theme => ({
    root: {
        width: "98%",
        marginLeft: "7vw",
        marginTop: "6vh",
    },
    detail: {
        // marginLeft: "/2vw",
    },
    submitButton: {
        marginTop: 20,
    },
    uploadAvatar: {
        marginTop: 30,
    },
    inputBox: {
        marginTop: 20,
        marginBottom: 20,
        width: "100%"
    },
    genderSelect: {
        marginTop: 6
    }
});

class CartView extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    submit() {
        const nickname = document.getElementById("nicknameInput").value.trim();
        if (nickname.length > 15) {
            alert("昵称过长，最长为15个字符");
            return;
        }
        const email = document.getElementById("emailInput").value.trim();
        if (email.length > 0 && !checkEmail(email)) {
            alert("邮箱不合法，请修改");
            return;
        }
        if (email.length > 30) {
            alert("邮箱过长，最长为30个字符");
            return;
        }
        const name = document.getElementById("nameInput").value.trim();
        if (name.length > 10) {
            alert("姓名过长，最长为10个字符");
            return;
        }
        const tel = document.getElementById("telInput").value.trim();
        if (tel.length > 0 && !checkPhoneNumber(tel)) {
            alert("电话不合法，请修改");
            return;
        }
        if (tel.length > 15) {
            alert("电话过长，最长为15个字符");
            return;
        }
        const address = document.getElementById("addressInput").value.trim();
        if (address.length > 60) {
            alert("地址过长，最长为60个字符");
            return;
        }

        setUserInfo({
            nickname, name, email, tel, address
        }, (response) => {
            if (response) {
                alert("用户信息修改成功！")
            } else {
                alert("用户信息修改失败！")
            }
        })

        const avatarInput = document.getElementById("avatarInput");
        if (avatarInput.files.length !== 0) {
            image2Base64(avatarInput.files[0], (data) => {
                setAvatar(data, (response) => {
                    if (response) {
                        alert("头像上传成功！请刷新页面");
                    } else {
                        alert("头像上传失败！");
                    }
                });
            });
        }
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid container spacing={5} className={classes.root}>
                <Grid item xs={4}>
                    <img alt={"userAvatar"} src={this.props.user.avatar} width={"70%"}/>
                    <Typography variant={"body1"}
                                className={classes.uploadAvatar}>
                        更换头像
                    </Typography>
                    <input type={"file"}
                           id={"avatarInput"}
                           accept={".jpg"}
                    />
                </Grid>
                <Grid item xs={6} className={classes.detail}>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <Typography variant={"h4"} className={classes.bookName}>{this.props.user.username}</Typography>
                            <Typography variant={"h6"}>用户ID： {this.props.user.userId}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained"
                                    endIcon={<CheckIcon />}
                                    color={"primary"}
                                    onClick={this.submit.bind(this)}
                                    className={classes.submitButton}
                            >
                                修改
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                id={"nicknameInput"}
                                className={classes.inputBox}
                                variant="outlined"
                                label="昵称"
                                defaultValue={this.props.user.userInfo.nickname}
                            />
                            <TextField
                                id={"emailInput"}
                                className={classes.inputBox}
                                variant="outlined"
                                label="邮箱"
                                defaultValue={this.props.user.userInfo.email}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id={"nameInput"}
                                className={classes.inputBox}
                                variant="outlined"
                                label="姓名"
                                defaultValue={this.props.user.userInfo.name}
                            />
                            <TextField
                                id={"telInput"}
                                className={classes.inputBox}
                                variant="outlined"
                                label="电话"
                                defaultValue={this.props.user.userInfo.tel}
                            />
                        </Grid>
                    </Grid>
                    <Typography variant={"h6"}>收货地址：</Typography>
                    <TextField
                        id={"addressInput"}
                        className={classes.inputBox}
                        variant="outlined"
                        multiline={true}
                        defaultValue={this.props.user.userInfo.address}
                    />
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <Typography variant={"h6"}>性别：</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <select id={"gender"} className={classes.genderSelect}>
                                <option value={"male"} id={"male"}>男</option>
                                <option value={"female"} id={"female"}>女</option>
                                <option value={"secret"} id={"secret"}>保密</option>
                            </select>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(CartView);
