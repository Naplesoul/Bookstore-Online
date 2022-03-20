import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {chatService} from "../services/ChatService";
import 'react-chat-elements/dist/main.css';
import { MessageList } from 'react-chat-elements'
import SendIcon from '@material-ui/icons/Send';
import Grid from "@material-ui/core/Grid";
import {Button, TextField} from "@material-ui/core";

const styles = theme => ({
    send: {
        position: "fixed",
        bottom: 20,
        width: "80vw",
    },
    chatInput: {
        width: "100%",
        height: "100%",
    },
    sendButton: {
        marginTop: 8,
        height: "70%",
    },
});

class ChatRoomView extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        chatService.connect();
        this.props.clearNewMessageCount();
    }

    onKeyPress(e) {
        if (e.which === 13) {
            this.sendText();
        }
    }

    sendText() {
        const chatInput = document.getElementById("chatInput");
        const msgStr = chatInput.value.trim();
        if (msgStr.length === 0) {
            alert("请勿发送空白消息");
            chatInput.value = "";
            return;
        }
        if (msgStr.length > 999) {
            alert("消息长度不能超过999个字符");
            return;
        }
        chatInput.value = "";
        this.props.addMessage({
            messageType: "text",
            message: msgStr,
        });
        chatService.send({
            messageType: "text",
            message: msgStr,
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <MessageList
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={this.props.messages}
                />
                <Grid container spacing={3} className={classes.send}>
                    <Grid item xs={1} md={1} xl={1} />
                    <Grid item xs={9} md={9} xl={9}>
                        <TextField
                            id={"chatInput"}
                            autoFocus={true}
                            variant="outlined"
                            label={"在此输入..."}
                            className={classes.chatInput}
                            onKeyPress={this.onKeyPress.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={2} md={2} xl={2}>
                        <Button variant="contained"
                                endIcon={<SendIcon />}
                                color={"primary"}
                                onClick={this.sendText.bind(this)}
                                className={classes.sendButton}
                        >
                            发送
                        </Button>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default withStyles(styles)(ChatRoomView);
