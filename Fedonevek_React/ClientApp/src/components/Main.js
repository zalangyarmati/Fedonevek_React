import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './New.css';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';


export class Main extends Component {
    static displayName = Main.name;

    constructor(props) {
        super(props);

        this.state = {
            hubConnection: null,
            blink: true,
            users: [],
            rooms: []
        };
    }

    componentDidMount() {
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

        setInterval(() => {
            this.setState(previous => {
                return { blink: !previous.blink}
            })
        }, 1000)
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
                                    return <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                                {item.nickName} <br/>{item.point} p
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
                                    this.state.rooms.map(function (item, index) {
                                    if (item.started == true && b)
                                        return <Link to={`/game/${item.id}`}>
                                            <div class="bg-success mt-2 d-flex justify-content-center text-white p-2" style={{borderRadius: '12px'}}>
                                                        <span style={{ marginLeft: "auto" }}>{item.name}</span>
                                                        <span style={{ marginLeft: "auto" }}>&#128308;</span>
                                                    </div>
                                                </Link>
                                    else 
                                        return <Link to={`/game/${item.id}`}>
                                                   <div class="bg-success mt-2 d-flex justify-content-center text-white p-2" style={{borderRadius: '12px'}}>
                                                        <span >{item.name}</span>
                                                    </div>
                                                </Link>
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
                                <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                    T
                                </div>
                                <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                    O
                                </div>
                                <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                    D
                                </div>
                                <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                    O
                                </div>
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