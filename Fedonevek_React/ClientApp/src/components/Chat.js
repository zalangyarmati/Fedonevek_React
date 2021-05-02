import React, { Component } from 'react';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import './Styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import authService from './api-authorization/AuthorizeService';
import { Emojis }  from './Emojis.js'
import  jsemoji from 'emoji-js'

export class Chat extends Component {
    static displayName = Chat.name;

    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            message: '',
            messages: [],
            hubConnection: null,
            username: '',
            pickerVisible: false
        };
    }

    emojiClicked = (code, emoji) => {
        let emojiPic = jsemoji.replace_colons(`:${emoji.name}:`);
        this.setState({ message: this.refs.newMessage.value + emojiPic });
        this.refs.newMessage.value = this.state.message;
        console.log("clicked emoji")
    }

    componentDidMount = () => {
        this._subscription = authService.subscribe(() => this.getUserName());
        this.getUserName();
        const hubConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:5001/chat")
            .configureLogging(LogLevel.Information)
            .build();
        this.setState({ hubConnection }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));
            this.state.hubConnection.on('sendToAll', (receivedMessage) => {
                const text = ` ${receivedMessage}`;
                this.setState({message: text})
                const messages = this.state.messages.concat([text]);
                this.setState({ messages });
            });
        });
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async getUserName() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({ username: user && user.name })
    }

    messageSend = () => {
        let msg = {
            Message: this.refs.newMessage.value,
            Sender: this.state.username
        };

        fetch('https://localhost:5001/api/message', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(msg)
        });

        this.refs.newMessage.value = '';
        var cb = this.refs.chatBox;
        var max = Math.max(cb.scrollHeight, cb.clientHeight);
        cb.scrollTop = max - cb.clientHeight;
    }

    setPicker = () => {
        var current = this.state.pickerVisible
        this.setState({ pickerVisible: !current })
    }

    render() {

        var pickerRender = this.state.pickerVisible;
        return (
            <div class="border">
                {pickerRender &&
                    <div class="picker">
                        < Emojis handleClick={this.emojiClicked} />
                    </div>
                }
                <div class="chatbox" ref="chatBox">{this.state.messages.map((m) => <div>{m}</div>)}</div>
                <div class="d-flex">
                    <div class="d-flex justify-content-center" onClick={this.setPicker} >&#128526;</div>
                    <input class="flex-grow-1" type="text" ref="newMessage"/>
                    <button onClick={this.messageSend}>Küldés</button>
                </div>


            </div>
        );
    }

}
