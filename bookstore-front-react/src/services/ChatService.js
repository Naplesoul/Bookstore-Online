import {config} from "../config";


class ChatService {
    constructor() {
        this.newMessageCallbacks = new Map();
    }

    registerNewMessageListener(key, callback) {
        this.newMessageCallbacks.set(key, callback);
    }

    removeNewMessageListener(key) {
        this.newMessageCallbacks.delete(key);
    }

    connect() {
        if (this.socket == null || this.socket.readyState !== WebSocket.OPEN) {
            this.socket = new WebSocket(config.chatUrl);
            this.socket.onmessage = this.onMessage;
        }
    }

    onMessage = (event) => {
        const msg = JSON.parse(event.data);
        this.newMessageCallbacks.forEach((callback) => {
            callback(msg);
        });
    }

    send(msg) {
        const jsonStr = JSON.stringify(msg);
        this.socket && this.socket.send(jsonStr);
    }
}

export const chatService = new ChatService();
