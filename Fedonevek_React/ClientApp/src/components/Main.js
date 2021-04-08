import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './New.css';

export class Main extends Component {
    static displayName = Main.name;

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            rooms: []
        };
    }

    componentDidMount() {
        this.getTopList();
        this.getRooms();
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
        return (
            <div class="container">
                <div class="row">

                    <div class="col-sm-3 d-flex pb-3">
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
                                {this.state.rooms.map(function (item, index) {
                                    return <Link to={`/game/${item.id}`}>
                                                <div class="bg-success mt-2 d-flex justify-content-center text-white p-2">
                                                     {item.name}
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