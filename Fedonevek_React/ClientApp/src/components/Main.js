import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './New.css';

export class Main extends Component {
    static displayName = Main.name;

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
                                <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                    Zalan 100p
                                </div>
                                <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                    Zalan 100p
                                </div>
                                <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                    Zalan 100p
                                </div>
                                <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                    Zalan 100p
                                </div>
                                <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                    Zalan 100p
                                </div>
                                <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                    Zalan 100p
                                </div>
                                <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                    Zalan 100p
                                </div>
                                <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                    Zalan 100p
                                </div>
                            </div>
   
                        </div>
                    </div>

                    <div class="col">
                        <div class="card">
                            <div class="card-header bg-transparent col d-flex justify-content-center">
                                <h4>Szobak</h4>
                            </div>
                            <div class="card-body">
                                <div class="bg-success mt-2 d-flex justify-content-center text-white p-2">
                                    Szoba 24134
                                </div>
                                <div class="bg-success mt-2 d-flex justify-content-center text-white p-2">
                                    Szoba 3434
                                </div>
                                <div class="bg-success mt-2 d-flex justify-content-center text-white p-2">
                                    Szoba 3434
                                </div>
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
                                    Dani
                                </div>
                                <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                    Gergo
                                </div>
                                <div class="bg-secondary mt-2 d-flex justify-content-center text-white p-2">
                                    Vili
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