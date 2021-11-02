import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import authService from './api-authorization/AuthorizeService';
import { HighScores } from './HighScores';
import { Friends } from './Friends';
import { Rooms } from './Rooms';
import { Start } from './Start';

export class Main extends Component {
    static displayName = Main.name;

    constructor(props) {
        super(props);

        this.state = {
            hubConnection: null,
            blink: true,
            users: [],
            rooms: [],
            userid: {},
            friends: []
        };
    }

    async componentDidMount() {
        this._subscription = authService.subscribe(() => this.getUserId());
        await this.getUserId();

        const hubConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:5001/game")
            .configureLogging(LogLevel.Information)
            .build();


        this.setState({ hubConnection }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('GameHub Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('roomcreated', () => {
                this.getRooms();
            });
        });

        this.getTopList();
        this.getRooms();
        this.getFriends(this.state.userid);

        setInterval(() => {
            this.setState(previous => {
                return { blink: !previous.blink}
            })
        }, 1000)
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async getUserId() {
        const [user] = await Promise.all([authService.getUser()]);
        this.setState({ userid: user.sub });
    }

    getTopList() {
        console.log("list got");
        fetch('https://localhost:5001/api/users')
            .then(response => response.json())
            .then(response => this.setState({ users: response }))
    }

    getRooms() {
        fetch('https://localhost:5001/api/rooms')
            .then(response => response.json())
            .then(response => this.setState({ rooms: response }))
    }

    getFriends(id) {
        fetch(`https://localhost:5001/api/users/friends/${id}`)
            .then(response => response.json())
            .then(response => this.setState({ friends: response }))
    }

    render() {
        var b = this.state.blink
        return (
            <div class="container">
                <div class="row">
                    <Rooms alignment={'left'} rooms={this.state.rooms} />
                    <HighScores alignment={'right'} users={this.state.users} />
                    <Friends alignment={'left'} friends={this.state.friends} />
                    <Start alignment={'right'} />
                </div>
            </div>
        );
    }
}