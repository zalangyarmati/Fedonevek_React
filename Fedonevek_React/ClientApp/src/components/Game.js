import React, { Component } from 'react';
import { Card, CardDeck, Modal } from 'react-bootstrap';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import './New.css';
import { Button } from './Button';
import { Chat } from './Chat';
import cardsData from "./Dummy";
import authService from './api-authorization/AuthorizeService';

export class Game extends Component {
    static displayName = Game.name;

    constructor() {
        super();
        this.state = {
            hubConnection: null,
            blue: 8,
            red: 7,
            black: 1,
            ended: false,
            string: "",
            room: {},
            userid: {},
            side:
                { isBlue: false, isSpy: false },
            cards: [],
            players: []
        }

        this.cardClicked = this.cardClicked.bind(this);
    }

    async componentDidMount() {
        const { id } = this.props.match.params;

        await fetch(`https://localhost:5001/api/rooms/${id}`)
            .then(response => response.json())
            .then(response => this.setState({ room: response }))
            .then(() => console.log(this.state.room.id));

        await fetch(`https://localhost:5001/api/rooms/${id}/cards`)
            .then(response => response.json())
            .then(response => this.setState({ cards: response }));

        await fetch(`https://localhost:5001/api/rooms/${id}/players`)
            .then(response => response.json())
            .then(response => this.setState({ players: response }));

        const hubConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:5001/game")
            .configureLogging(LogLevel.Information)
            .build();

        this.setState({ hubConnection }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('GameHub Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('reveal', (receivedMessage) => {
                const id = receivedMessage;

                let cardscopy = this.state.cards;
                cardscopy.map((item, index) => {
                    if (item.id == id) item.revealed = true;
                })

                this.setState({ cards: cardscopy })
            });
            this.state.hubConnection.on('changeside', async (value, roomid, userid, username) => {
                await fetch(`https://localhost:5001/api/rooms/${id}/players`)
                    .then(response => response.json())
                    .then(response => this.setState({ players: response }));
                console.log(this.state.players);
            });
            this.state.hubConnection.on('start', () => {
                let roomcopy = this.state.room;
                roomcopy.started = true;

                this.setState({ room: roomcopy })

            })
        });

        this._subscription = authService.subscribe(() => this.getUserId());
        this.getUserId();

    }

    async getUserId() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
        this.setState({ userid: user.sub });
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    startGame() {
        var roomid = this.state.room.id;
        fetch(`https://localhost:5001/api/rooms/${roomid}/start`, {
            method: 'POST'
        });
        var roomcopy = this.state.room;
        roomcopy.started = true;
        this.setState({ room: roomcopy });
        console.log("started");
    }

    changeSide(side, spy) {
        var roomid = this.state.room.id;
        var userid = this.state.userid;
        var copy = this.state.side;
        copy.isBlue = side;
        copy.isSpy = spy;
        this.setState({ side: copy })
        console.log(this.state.side.isBlue)
        console.log(this.state.side.isSpy)
        console.log(this.state.room.id)

        fetch(`https://localhost:5001/api/rooms/side/${roomid}/${userid}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(this.state.side)
        });
    }

    cardClicked(id) {
        fetch(`https://localhost:5001/api/rooms/${id}/reveal`, {
            method: 'POST'
        });
        console.log(`clicked ${id}`);
    }

    render() {
        if (!this.state.cards && !this.state.room) {
            return <div />
        }
        let string
        if (this.state.blue == 0) {
            string = "Kek nyert";
        }
        else if (this.state.red == 0) {
            string = "Piros nyert";
        }

        if (this.state.room.started == true)
            return (
            <div class="container">
                <div class="row">
                    <div class="col-sm-3 d-flex pb-3">
                        <div class="card card-block card-fill  bg-danger">
                                <h1>{this.state.red}</h1>
                                {this.state.players.map((item, index) => {
                                    return item.isBlue == false && item.isSpy == true ? <p style={{ fontWeight: "bold" }}>{item.userName}</p> : null
                                })}
                                {this.state.players.map((item, index) => {
                                    return item.isBlue == false && item.isSpy == false ? <p>{item.userName}</p> : null
                                })}
                        </div>
                    </div>
                    <div class="col-6">
                        <CardDeck style={{ padding: 12 }}>
                            {this.state.cards.map((item, index) => {
                                return index < 5 ? < Button card={item} team={item.team} word={item.word} handleClick={this.cardClicked} /> : null
                            })}
                        </CardDeck>
                        <CardDeck style={{ padding: 12 }}>
                            {this.state.cards.map((item, index) => {
                                return index >= 5 && index < 10 ? < Button card={item} team={item.team} word={item.word} handleClick={this.cardClicked} /> : null
                            })}
                        </CardDeck>
                        <CardDeck style={{ padding: 12 }}>
                            {this.state.cards.map((item, index) => {
                                return index >= 10 && index < 15 ? < Button card={item} team={item.team} word={item.word} handleClick={this.cardClicked} /> : null
                            })}
                        </CardDeck>
                        <CardDeck style={{ padding: 12 }}>
                            {this.state.cards.map((item, index) => {
                                return index >= 15 && index < 20 ? < Button card={item} team={item.team} word={item.word} handleClick={this.cardClicked} /> : null
                            })}
                        </CardDeck>
                        <CardDeck style={{ padding: 12 }}>
                            {this.state.cards.map((item, index) => {
                                return index >= 20 && index < 25 ? < Button card={item} team={item.team} word={item.word} handleClick={this.cardClicked} /> : null
                            })}
                        </CardDeck>

                    </div>
                    <div class="col-sm-3 d-flex pb-3">
                        <div class="card card-block card-fill bg-primary ">
                                <h1>{this.state.blue}</h1>
                                {this.state.players.map((item, index) => {
                                    return item.isBlue == true && item.isSpy == true ? <p style={{ fontWeight: "bold" }}>{item.userName}</p> : null
                                })}
                                {this.state.players.map((item, index) => {
                                    return item.isBlue == true && item.isSpy == false ? <p>{item.userName}</p> : null
                                })}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <h1>A szó:</h1>
                        <p>valami</p>
                    </div>

                    <div class="col-6">
                        <Chat />
                    </div>
                    <div>
                        <h1>{string}</h1>
                    </div>
                </div>
                <div class="row">


                </div>
            </div>
        )
     
        else return (
            <div class="container">
                <div class="row">
                    <div class="col-sm-3 d-flex pb-3">
                        <div class="card card-block card-fill  bg-danger" onClick={() => this.changeSide(false, false)} >
                            <h1>Piros játékosok</h1>
                            {this.state.players.map((item, index) => {
                                return item.isBlue == false && item.isSpy == false ? <p>{ item.userName}</p> : null
                            })}
                        </div>
                    </div>
                    <div class="col-6">
                        
                    </div>
                    <div class="col-sm-3 d-flex pb-3">
                        <div class="card card-block card-fill bg-primary" onClick={() => this.changeSide(true, false)} >
                            <h1>Kék játékosok</h1>
                            {this.state.players.map((item, index) => {
                                return item.isBlue == true && item.isSpy == false ? <p>{item.userName}</p> : null
                            })}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 d-flex pb-3">
                        <div class="card card-block card-fill  bg-danger" onClick={() => this.changeSide(false, true)}>
                            <h1>Kém</h1>
                            {this.state.players.map((item, index) => {
                                return item.isBlue == false && item.isSpy == true ? <p>{item.userName}</p> : null
                            })}
                        </div>
                    </div>
                    <div class="col-6 d-flex justify-content-center">
                        <button type="button" class="btn btn-success" onClick={() => this.startGame()}>Játék indítása</button>
                    </div>
                    <div class="col-sm-3 d-flex pb-3">
                        <div class="card card-block card-fill bg-primary" onClick={() => this.changeSide(true, true)} >
                            <h1>Kém</h1>
                            {this.state.players.map((item, index) => {
                                return item.isBlue == true && item.isSpy == true ? <p>{item.userName}</p> : null
                            })}
                        </div>
                    </div>
                </div>
            </div>          
        )
    }
}
