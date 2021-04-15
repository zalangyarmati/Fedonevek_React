import React, { Component } from 'react';
import { Card, CardDeck, Modal } from 'react-bootstrap';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import './New.css';
import { Button } from './Button';
import { Chat } from './Chat';
import { SpyCard } from './SpyCard';
import authService from './api-authorization/AuthorizeService';

export class Game extends Component {
    static displayName = Game.name;

    constructor() {
        super();
        this.state = {
            url: "https://localhost:5001/api/rooms/",
            hubConnection: null,
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

        await this.getRoom(id);
        await this.getCards(id);
        await this.getPlayers(id);

        this._subscription = authService.subscribe(() => this.getUserId());
        this.getUserId();

        const hubConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:5001/game")
            .configureLogging(LogLevel.Information)
            .build();

        this.setState({ hubConnection, id }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('GameHub Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('reveal', (cardId, bluepoint, redpoint, current) => {
                const id = cardId;

                let roomcopy = this.state.room;
                let cardscopy = this.state.cards;
                cardscopy.map((item) => {
                    if (item.id == id) {
                        if (item.color == 1) roomcopy.blueScore = bluepoint;
                        if (item.color == 2) roomcopy.redScore = redpoint;
                        if (roomcopy.currentNumber != current) item.revealed = true;
                    }
                })
                roomcopy.currentNumber = current;

                this.setState({ cards: cardscopy })
            });
            this.state.hubConnection.on('changeside', async () => {
                this.getPlayers(id);
            });
            this.state.hubConnection.on('start', () => {
                let roomcopy = this.state.room;
                roomcopy.started = true;
                this.setState({ room: roomcopy })

            });
            this.state.hubConnection.on('newWord', (word, number) => {
                let roomcopy = this.state.room;
                roomcopy.currentWord = word;
                roomcopy.currentNumber = number;
                roomcopy.bluesTurn = !roomcopy.bluesTurn;
                this.setState({ room: roomcopy })
            });
        });
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async getRoom(id) {
        await fetch(`${this.state.url}${id}`)
            .then(response => response.json())
            .then(response => this.setState({ room: response }))
    }

    async getCards(id) {
        await fetch(`${this.state.url}${id}/cards`)
            .then(response => response.json())
            .then(response => this.setState({ cards: response }));
    }

    async getPlayers(id) {
        await fetch(`${this.state.url}${id}/players`)
            .then(response => response.json())
            .then(response => this.setState({ players: response }));
    }

    async getUserId() {
        const [user] = await Promise.all([authService.getUser()]);
        this.setState({ userid: user.sub });
    }

    startGame() {
        var roomid = this.state.room.id;
        fetch(`https://localhost:5001/api/rooms/${roomid}/start`, {
            method: 'POST'
        });
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
        var player;
        this.state.players.map((item) => {
            if (item.userId == this.state.userid) {
                player = item;
            }
        })



        if (!player.isSpy) {
            this.state.cards.map((item) => {
                if (item.id == id && item.revealed == false) {
                    fetch(`https://localhost:5001/api/rooms/${id}/reveal`, {
                        method: 'POST'
                    });
                }
            })
        }
    }

    sendWord = () => {
        let newWord = {
            RoomID: this.state.room.id,
            Word: this.refs.spyWord.value,
            Number: this.refs.spyNumber.value
        };

        fetch(`https://localhost:5001/api/rooms/${this.state.room.id}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newWord)
        });

        this.refs.spyWord.value = "";
        this.refs.spyNumber.value = "";
    }

    getMe() {
        this.state.players.map((item) => {
            if (item.userId == this.state.userid) {
                return item;
            }
        })
    }


    render() {
        if (!this.state.cards && !this.state.room && !this.state.userid) {
            return <div />
        }
        let string
        if (this.state.blue == 0) {
            string = "Kek nyert";
        }
        else if (this.state.red == 0) {
            string = "Piros nyert";
        }

        var spyRender = false;
        this.state.players.map((item) => {
            if (item.userId == this.state.userid) {
                spyRender = item.isSpy
            }
        })

        let wordColor 
        if (this.state.room.bluesTurn) {
            wordColor = "#0275d8";

        }
        else{
            wordColor = "#d9534f";
        }
        if (this.state.room.started == true)
            return (
                <div class="container">
                    <div class="row">
                        <div class="col-sm-3 d-flex pb-3">
                            <div class="card card-block card-fill  bg-danger">
                                <h1>{this.state.room.redScore}</h1>
                                {this.state.players.map((item) => {
                                    return item.isBlue == false && item.isSpy == true ? <p style={{ fontWeight: "bold" }}>{item.userName}</p> : null
                                })}
                                {this.state.players.map((item) => {
                                    return item.isBlue == false && item.isSpy == false ? <p>{item.userName}</p> : null
                                })}
                            </div>
                        </div>
                        <div class="col-6">
                            <CardDeck style={{ padding: 12 }}>
                                {this.state.cards.map((item, index) => {
                                    return index < 5 ? < Button card={item} handleClick={this.cardClicked} /> : null
                                })}
                            </CardDeck>
                            <CardDeck style={{ padding: 12 }}>
                                {this.state.cards.map((item, index) => {
                                    return index >= 5 && index < 10 ? < Button card={item} handleClick={this.cardClicked} /> : null
                                })}
                            </CardDeck>
                            <CardDeck style={{ padding: 12 }}>
                                {this.state.cards.map((item, index) => {
                                    return index >= 10 && index < 15 ? < Button card={item} handleClick={this.cardClicked} /> : null
                                })}
                            </CardDeck>
                            <CardDeck style={{ padding: 12 }}>
                                {this.state.cards.map((item, index) => {
                                    return index >= 15 && index < 20 ? < Button card={item} handleClick={this.cardClicked} /> : null
                                })}
                            </CardDeck>
                            <CardDeck style={{ padding: 12 }}>
                                {this.state.cards.map((item, index) => {
                                    return index >= 20 && index < 25 ? < Button card={item} handleClick={this.cardClicked} /> : null
                                })}
                            </CardDeck>

                        </div>
                        <div class="col-sm-3 d-flex pb-3">
                            <div class="card card-block card-fill bg-primary ">
                                <h1>{this.state.room.blueScore}</h1>
                                {this.state.players.map((item) => {
                                    return item.isBlue == true && item.isSpy == true ? <p style={{ fontWeight: "bold" }}>{item.userName}</p> : null
                                })}
                                {this.state.players.map((item) => {
                                    return item.isBlue == true && item.isSpy == false ? <p>{item.userName}</p> : null
                                })}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <h1>A szó:</h1>
                            <Card style={{ backgroundColor: wordColor }}>{this.state.room.currentWord}</Card>
                            <p>{this.state.room.currentNumber}</p>
                            {spyRender &&
                                <div>
                                    <input class="flex-grow-1" type="number" ref="spyNumber" />
                                    <div class="d-flex">
                                        <input class="flex-grow-1" type="text" ref="spyWord" />
                                        <button onClick={this.sendWord}>Küldés</button>
                                    </div>
                                </div>
                            }
                        </div>

                        <div class="col-6">
                            <Chat />
                        </div>
                        <div>
                            <h1>{string}</h1>
                        </div>

                        {spyRender &&
                            <div class="col-3 " style={{ border: '5px solid blue' }}>
                                <CardDeck style={{ padding: 12 }}>
                                    {this.state.cards.map((item, index) => {
                                        return index < 5 ? <SpyCard card={item}></SpyCard> : null
                                    })}
                                </CardDeck>
                                <CardDeck style={{ padding: 12 }}>
                                    {this.state.cards.map((item, index) => {
                                        return index >= 5 && index < 10 ? <SpyCard card={item}></SpyCard> : null
                                    })}
                                </CardDeck>
                                <CardDeck style={{ padding: 12 }}>
                                    {this.state.cards.map((item, index) => {
                                        return index >= 10 && index < 15 ? <SpyCard card={item}></SpyCard> : null
                                    })}
                                </CardDeck>
                                <CardDeck style={{ padding: 12 }}>
                                    {this.state.cards.map((item, index) => {
                                        return index >= 15 && index < 20 ? <SpyCard card={item}></SpyCard> : null
                                    })}
                                </CardDeck>
                                <CardDeck style={{ padding: 12 }}>
                                    {this.state.cards.map((item, index) => {
                                        return index >= 20 && index < 25 ? <SpyCard card={item}></SpyCard> : null
                                    })}
                                </CardDeck>
                             </div>
                        }
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
                            {this.state.players.map((item) => {
                                return item.isBlue == false && item.isSpy == false ? <p>{item.userName}</p> : null
                            })}
                        </div>
                    </div>
                    <div class="col-6">

                    </div>
                    <div class="col-sm-3 d-flex pb-3">
                        <div class="card card-block card-fill bg-primary" onClick={() => this.changeSide(true, false)} >
                            <h1>Kék játékosok</h1>
                            {this.state.players.map((item) => {
                                return item.isBlue == true && item.isSpy == false ? <p>{item.userName}</p> : null
                            })}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 d-flex pb-3">
                        <div class="card card-block card-fill  bg-danger" onClick={() => this.changeSide(false, true)}>
                            <h1>Kém</h1>
                            {this.state.players.map((item) => {
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
                            {this.state.players.map((item) => {
                                return item.isBlue == true && item.isSpy == true ? <p>{item.userName}</p> : null
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
