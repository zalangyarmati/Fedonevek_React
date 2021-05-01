import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import authService from './api-authorization/AuthorizeService';


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

                    <div class="col-sm-3  pb-3">
                        <div class="card card-block card-fill">
                            <div class="card-header bg-transparent col d-flex justify-content-center">
                                <h4>Ranglista</h4>
                            </div>
                            <div class="card-body">
                                {this.state.users.map(function (item, index) {
                                    if (index == 0) return <div class="mt-2 d-flex justify-content-center text-white p-2" style={{ borderRadius: '12px', backgroundColor: '#ffd700' }}>
                                                {item.userName} <br/>{item.point} p
                                           </div>
                                    if (index == 1) return <div class="mt-2 d-flex justify-content-center text-white p-2" style={{ borderRadius: '12px', backgroundColor: '#C0C0C0' }}>
                                        {item.userName} <br />{item.point} p
                                           </div>
                                    if (index == 2) return <div class="mt-2 d-flex justify-content-center text-white p-2" style={{ borderRadius: '12px', backgroundColor: '#cd7f32' }}>
                                        {item.userName} <br />{item.point} p
                                           </div>
                                    if (index > 2) return <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2" style={{ borderRadius: '12px' }}>
                                        {item.userName} <br />{item.point} p
                                           </div>
                                })}
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div class="card">
                            <div class="card-header bg-transparent col d-flex justify-content-center">
                                <h4>Szobak</h4>
                            </div>
                            <div class="card-body">
                                {
                                    this.state.rooms.map(function (item) {
                                        if (!item.finished) {
                                            if (item.started == true && b)
                                                return <Link to={`/game/${item.id}`}>
                                                    <div class="bg-success mt-2 d-flex justify-content-center text-white p-2" style={{ borderRadius: '12px' }}>
                                                        <span style={{ marginLeft: "auto" }}>{item.name}</span>
                                                        <span style={{ marginLeft: "auto" }}>&#128308;</span>
                                                    </div>
                                                </Link>
                                            else
                                                return <Link to={`/game/${item.id}`}>
                                                    <div class="bg-success mt-2 d-flex justify-content-center text-white p-2" style= {{borderRadius: '12px'}}>
                                                        <span >{item.name}</span>
                                                    </div>
                                                </Link>
                                        }
                                        else {
                                            return 
                                        }

                                })}
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-3 pb-3">
                        <div class="card">
                            <div class="card-header bg-transparent col d-flex justify-content-center">
                                <h4>Baratok</h4>
                            </div>
                            <div class="card-body">
                                {this.state.friends.map(function (item) {
                                    return <div class="mt-2 d-flex justify-content-center text-white p-2" style={{ borderRadius: '12px', backgroundColor: '#DA70D6' }}>
                                            {item.userName} 
                                           </div>
                                })}
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <Link to="/room" style={{ textDecoration: 'none' }}>
                        <div class="mt-3 col-sm-12">
                            <button type="button" class="btn btn-block btn-outline-success">Jatek</button>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}