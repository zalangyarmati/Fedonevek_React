import React, { Component } from 'react';
import './Styles.css';
import { Link } from 'react-router-dom';
import { CardContainer, CardContent } from './Parallax'

export class Start extends Component {
    static displayName = Start.name;

    constructor() {
        super();
    }

    render() {
        return (
            <CardContainer>
                <CardContent alignment={this.props.alignment} img={this.props.img}>
                    <Link to="/room" class="card-header bg-transparent col d-flex justify-content-center link" style={{ textDecoration: 'none' }}>
                        <h4>Játék</h4>
                    </Link>
                </CardContent>
            </CardContainer>
        )
    }
}