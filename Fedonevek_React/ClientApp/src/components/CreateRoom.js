import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';

export class CreateRoom extends Component {
    static displayName = CreateRoom.name;


    create = () =>  {
        let data = {
            Name: this.refs.inputField.value,
        };

        fetch('https://localhost:5001/api/rooms', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    render() {
        return (
            <div class="col d-flex justify-content-center">
                <div class="card">
                    <div class="card-header bg-transparent col d-flex justify-content-center">
                        <h4>Új szoba létrehozása</h4>
                    </div>
                    <div class="pt-4">
                        <h5>Szoba neve:</h5>
                        <input type="text" ref="inputField"></input>
                    </div>
                    <div class="form-group">
                        <div class="mt-3 col-sm-12 d-flex justify-content-center">
                            <Link to="/" onClick={this.create} style={{ textDecoration: 'none' }}>
                                <button class="btn btn-block btn-outline-success">Létrehozás</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}