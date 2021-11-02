import React, { Component } from 'react';
import './Styles.css';
import { CardContainer, CardContent } from './Parallax'

export class HighScores extends Component {
    static displayName = HighScores.name;

    constructor() {
        super();
    }

    render() {
        return (
            <CardContainer>
                <CardContent alignment={this.props.alignment}>
                    <div class="card-header bg-transparent col d-flex justify-content-center">
                        <h4>Ranglista</h4>
                    </div>
                    <div class="card-body">
                        {this.props.users.map(function (item, index) {
                            return <div class="mt-2 d-flex justify-content-center p-2" style={{ borderRadius: '12px', fontWeight: 'bold', color: 'black' }}>
                                <p>{item.userName} - {item.point} pont</p>
                            </div>
                        })}
                    </div>
                </CardContent>
            </CardContainer>
        )
    }
}