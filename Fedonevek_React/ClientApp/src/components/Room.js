import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';


export class Room extends Component {
    static displayName = Room.name;

    render() {
        return (
            <div class="container">
                    <div class="row">
                        <div class="col-sm-4 d-flex pb-4">
                            <div class="card card-block bg-danger">
                                <h1>Piros jatekosok</h1>
                            </div>
                        </div>
                        <div class="col-sm-4 d-flex pb-4">
                            <div class="card card-block">
                                <h1>Varakozo jatekosok</h1>
                                <div class="card-body">
                                    <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                        Jatekos1
                                    </div>
                                    <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                        Jatekos2
                                    </div>
                                    <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                        Jatekos3
                                    </div>
                                    <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                        Jatekos4
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4 d-flex pb-4">
                            <div class="card card-block bg-primary">
                                <h1>Kek jatekosok</h1>
                            </div>
                        </div>

                    </div>
                    <div>
                        <Link to="/game" style={{ textDecoration: 'none' }}>
                            <div class="mt-3 col-12 pb-4">
                                <button type="button" class="btn btn-block btn-outline-success">Inditas</button>
                            </div>
                        </Link>
                    </div>
            </div>
        )
    }

}