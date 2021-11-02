import React, { Component } from 'react';
import './Styles.css';
import { Link } from 'react-router-dom';
import { CardContainer, CardContent } from './Parallax'

export class Rooms extends Component {
    static displayName = Rooms.name;

    constructor() {
        super();

        this.state = {
            blink: true,
        };
    }

    async componentDidMount() {
        setInterval(() => {
            this.setState(previous => {
                return { blink: !previous.blink }
            })
        }, 1000)
    }

    render() {
        var b = this.state.blink
        return (
            <CardContainer>
                <CardContent alignment={this.props.alignment} img={this.props.img}>
                            <div class="card-header bg-transparent col d-flex justify-content-center">
                                <h4>Szobák</h4>
                            </div>
                            <div class="card-body">
                                {
                                    this.props.rooms.map(function (item) {
                                        if (!item.finished) {
                                            if (item.started == true && b)
                                                return <Link to={`/game/${item.id}`}>
                                                    <div class="mt-2 d-flex justify-content-center p-2" style={{ borderRadius: '12px', fontWeight: 'bold', color: 'red' }}>
                                                        <span >{item.name}</span>
                                                    </div>
                                                </Link>
                                            else
                                                return <Link to={`/game/${item.id}`}>
                                                    <div class="mt-2 d-flex justify-content-center p-2" style={{ borderRadius: '12px', fontWeight: 'bold', color: 'black' }}>
                                                        <span >{item.name}</span>
                                                    </div>
                                                </Link>
                                        }
                                        else {
                                            return
                                        }

                                    })}
                            </div>
                </CardContent>
            </CardContainer>
        )
    }
}