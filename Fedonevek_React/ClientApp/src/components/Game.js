import React, { Component } from 'react';
import { Card, CardDeck, CloseButton } from 'react-bootstrap';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import './Styles.css';
import { Button } from './Button';
import { Chat } from './Chat';
import { SpyCard } from './SpyCard';
import { PopUp } from './PopUp';
import authService from './api-authorization/AuthorizeService';
import fx from 'fireworks';
import 'bootstrap/dist/css/bootstrap.min.css';
import robot from '../images/robot.png';
import cloud from '../images/cloud.png';


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
            players: [],
            redSpyRobot: false,
            redSpyThinking: false,
            blueSpyRobot: false,
            blueSpyThinking: false,
            redPlayerRobot: false,
            redPlayerThinking: false,
            bluePlayerRobot: false,
            bluePlayerThinking: false,
            robotSide:
                { isBlue: false, isSpy: false },
            firework: false,
            intervalID: 0,
            show: false,
            friend:
                { userId: "", userName: "" }
        }

        this.cardClicked = this.cardClicked.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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

            this.state.hubConnection.on('reveal', async (roomid, cardId, bluepoint, redpoint, current, finished) => {
                if (this.state.room.id == roomid) {
                    const id = cardId;

                    let roomcopy = this.state.room;

                    if (roomcopy.bluesTurn && roomcopy.bluePlayerRobot) {
                        this.setState({ bluePlayerThinking: true });
                        await this.delay(5000);
                        this.setState({ bluePlayerThinking: false });
                    }
                    else if (!roomcopy.bluesTurn && roomcopy.redPlayerRobot) {
                        this.setState({ redPlayerThinking: true });
                        await this.delay(5000);
                        this.setState({ redPlayerThinking: false });
                    }

                    let cardscopy = this.state.cards;
                    cardscopy.map((item) => {
                        if (item.id == id) {
                            roomcopy.blueScore = bluepoint;
                            roomcopy.redScore = redpoint;
                            item.revealed = true;
                        }
                    })
                    roomcopy.finished = finished
                    roomcopy.currentNumber = current;
                    this.setState({ cards: cardscopy, room: roomcopy })
                    if (finished) {
                        cardscopy.map((item) => {
                            item.revealed = true;
                        })
                        this.fireworks();
                    }
                }
            });
            this.state.hubConnection.on('changeside', async () => {
                this.getPlayers(id);
            });
            this.state.hubConnection.on('start', (mod_room) => {
                if (mod_room.id == this.state.room.id) {
                    this.setState({ room: mod_room })
                }
            });
            this.state.hubConnection.on('newWord', async (id, word, number) => {
                if (this.state.room.id == id) {
                    let roomcopy = this.state.room;

                    if (!roomcopy.bluesTurn && roomcopy.blueSpyRobot) {
                        this.setState({ blueSpyThinking: true });
                        await this.delay(5000);
                        this.setState({ blueSpyThinking: false });
                    }
                    if (roomcopy.bluesTurn && roomcopy.redSpyRobot) {
                        this.setState({ redSpyThinking: true });
                        await this.delay(5000);
                        this.setState({ redSpyThinking: false });
                    }
                    roomcopy.currentWord = word;
                    roomcopy.currentNumber = number;
                    roomcopy.bluesTurn = !roomcopy.bluesTurn;
                    this.setState({ room: roomcopy })
                }
            });
            this.state.hubConnection.on('robotside', (side, roomid, userid) =>{
                if (this.state.room.id == roomid && this.state.userid != userid){
                    if (side.isBlue && side.isSpy){
                        this.setState({blueSpyRobot: !this.state.blueSpyRobot})
                    }
                    else if (side.isBlue && !side.isSpy){
                        this.setState({bluePlayerRobot: !this.state.bluePlayerRobot})
                    }
                    else if (!side.isBlue && side.isSpy){
                        this.setState({redSpyRobot: !this.state.redSpyRobot})
                    }
                    else if (!side.isBlue && !side.isSpy){
                        this.setState({redPlayerRobot: !this.state.redPlayerRobot})
                    }

                }
            })
        });
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
        clearInterval(this.state.intervalID);
    }

    delay = ms => new Promise(res => setTimeout(res, ms));

    async getRoom(id) {
        await fetch(`${this.state.url}${id}`)
            .then(response => response.json())
            .then(response => {
                this.setState(
                    {
                        room: response,
                        bluePlayerRobot: response.bluePlayerRobot,
                        blueSpyRobot: response.blueSpyRobot,
                        redPlayerRobot: response.redPlayerRobot,
                        redSpyRobot: response.redSpyRobot
                    })
            })

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
        var hasRed = false;
        var hasBlue = false;
        var hasRedspy = false;
        var hasBluespy = false;
        this.state.players.map((player) => {
            if (!player.isBlue && !player.isSpy) {
                hasRed = true;
            }
            else if (!player.isBlue && player.isSpy) {
                hasRedspy = true;
            }
            else if (player.isBlue && !player.isSpy) {
                hasBlue = true;
            }
            else if (player.isBlue && player.isSpy) {
                hasBluespy = true;
            }
        })

        if (this.state.bluePlayerRobot){
            hasBlue = true;
        }
        if (this.state.blueSpyRobot){
            hasBluespy = true;
        }
        if (this.state.redPlayerRobot){
            hasRed = true;
        }
        if (this.state.redSpyRobot){
            hasRedspy = true;
        }

        if (hasRed && hasBlue && hasRedspy && hasBluespy) {
            var roomid = this.state.room.id;
            fetch(`${this.state.url}${roomid}/start`, {
                method: 'POST'
            });
        }
    }

    changeSide(side, spy) {
        var roomid = this.state.room.id;
        var userid = this.state.userid;
        var copy = this.state.side;
        copy.isBlue = side;
        copy.isSpy = spy;
        this.setState({ side: copy })

        fetch(`https://localhost:5001/api/rooms/side/${roomid}/${userid}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(this.state.side)
        });
    }

    async handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        await this.setState({
            [name]: value
        });

        var robotIsBlue;
        var robotIsSpy;
        var copy = this.state.robotSide;

        if (name == "redSpyRobot") {
            robotIsBlue = false;
            robotIsSpy = true;
        }
        else if (name == "blueSpyRobot") {
            robotIsBlue = true;
            robotIsSpy = true;
        }
        else if (name == "redPlayerRobot") {
            robotIsBlue = false;
            robotIsSpy = false;
        }
        else if (name == "bluePlayerRobot") {
            robotIsBlue = true;
            robotIsSpy = false;
        }
        copy.isBlue = robotIsBlue;
        copy.isSpy = robotIsSpy;
        this.setState({ robotSide: copy })

        var roomid = this.state.room.id;
        fetch(`https://localhost:5001/api/rooms/side/robot/${roomid}/${this.state.userid}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(this.state.robotSide)
        });
    }

    cardClicked(id) {
        if (!this.state.room.finished && this.state.room.currentNumber > 0) {
            var player;
            this.state.players.map((item) => {
                if (item.userId == this.state.userid) {
                    player = item;
                }
            })

            var bluesTurn = this.state.room.bluesTurn
            var theirTurn = false;
            if ((player.isBlue && bluesTurn) || (!player.isBlue && !bluesTurn)) {
                theirTurn = true
            }
            if (!player.isSpy && theirTurn) {
                this.state.cards.map((item) => {
                    if (item.id == id && item.revealed == false) {
                        fetch(`https://localhost:5001/api/rooms/${id}/reveal`, {
                            method: 'POST'
                        });
                    }
                })
            }
        }
    }

    pass = () => {
        var player;
        this.state.players.map((item) => {
            if (item.userId == this.state.userid) {
                player = item;
            }
        })
        var bluesTurn = this.state.room.bluesTurn

        if ((!player.isSpy && this.state.room.currentNumber != 0 && player.isBlue && bluesTurn) || (!player.isSpy && this.state.room.currentNumber != 0 && !player.isBlue && !bluesTurn)) {
            fetch(`https://localhost:5001/api/rooms/${this.state.room.id}/pass`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' }
            });
        }
    }

    sendWord = () => {
        var player;
        this.state.players.map((item) => {
            if (item.userId == this.state.userid) {
                player = item;
            }
        })

        var bluesTurn = this.state.room.bluesTurn
        var theirTurn = false;
        if ((player.isBlue && !bluesTurn) || (!player.isBlue && bluesTurn)) {
            theirTurn = true
        }


        if (this.state.room.currentNumber == 0 && theirTurn && this.refs.spyNumber.value > 0 && this.refs.spyWord.value != "") {
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
    }

    friendModal(item) {
        if (item.userId != this.state.userid) {
            var friendCopy = this.state.friend;
            friendCopy.userId = item.userId;
            friendCopy.userName = item.userName;
            this.setState({
                show: !this.state.show,
                friend: friendCopy
            });
        }
    }

    getMe() {
        this.state.players.map((item) => {
            if (item.userId == this.state.userid) {
                return item;
            }
        })
    }

    fireworks() {
        var fwID = 0;
        if (this.state.room.blueScore == 0 && !this.state.firework) {
            fwID = window.setInterval(function () {
                fx({
                    x: Math.floor(Math.random() * window.innerWidth * 0.9),
                    y: Math.floor(Math.random() * window.innerHeight * 0.75),
                    colors: ['#0275d8', '#87ceeb', '#0000ff']
                });
            }, 400);
            this.setState({ firework: true });
        }
        else if (this.state.room.redScore == 0 && !this.state.firework) {
            fwID = window.setInterval(function () {
                fx({
                    x: Math.floor(Math.random() * window.innerWidth * 0.9),
                    y: Math.floor(Math.random() * window.innerHeight * 0.75),
                    colors: ['#ff6347', 'fa8072', '#ff0000']
                });
            }, 400);
            this.setState({ firework: true });
        }
        this.setState({ intervalID: fwID });
    }

    modalOk = (id) => {
        this.setState({ show: false });
        fetch(`https://localhost:5001/api/users/friends/new/${id}/${this.state.userid}`, {
            method: 'POST'
        })
    }
    modalCancel = () => {
        this.setState({ show: false })
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
        else {
            wordColor = "#d9534f";
        }

        var hasWord = false;
        if (this.state.room.currentWord != null) {
            hasWord = true;
        }

        if (this.state.room.started == true)
            return (
                <div class="container">
                    <div class="row">
                        <div class="col-sm-3 d-flex pb-3">
                            <div class="card centered card-block card-fill  grad-red">
                                <h1>{this.state.room.redScore}</h1>
                                {this.state.players.map((item) => {
                                    return !this.state.room.redSpyRobot && item.isBlue == false && item.isSpy == true ? <p onClick={() => this.friendModal(item)} style={{ fontWeight: "bold" }}>{item.userName}</p> : null
                                })}
                                {this.state.room.redSpyRobot &&
                                    <div class="row">
                                        <img src={robot} alt="Robot" height={70} width={70}/>
                                        {this.state.redSpyThinking && 
                                            <img class="cloud" src={cloud} alt="Cloud" height={70} width={70}/>
                                        }
                                    </div>
                                }
                                {this.state.players.map((item) => {
                                    return item.isBlue == false && item.isSpy == false ? <p onClick={() => this.friendModal(item)}>{item.userName}</p> : null
                                })}
                                {this.state.room.redPlayerRobot &&
                                    <div class="row">
                                        <img src={robot} alt="Robot" height={70} width={70}/>
                                        {this.state.redPlayerThinking && 
                                            <img class="cloud" src={cloud} alt="Cloud" height={70} width={70}/>
                                        }
                                    </div>
                                }
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
                            <div class="card centered card-block card-fill grad-blue ">
                                <h1>{this.state.room.blueScore}</h1>
                                {this.state.players.map((item) => {
                                    return !this.state.room.blueSpyRobot && item.isBlue == true && item.isSpy == true ? <p onClick={() => this.friendModal(item)} style={{ fontWeight: "bold" }}>{item.userName}</p> : null
                                })}
                                {this.state.room.blueSpyRobot &&
                                    <div class="row">
                                        <img src={robot} alt="Robot" height={70} width={70}/>
                                        {this.state.blueSpyThinking && 
                                            <img class="cloud" src={cloud} alt="Cloud" height={70} width={70}/>
                                        }
                                    </div>
                                }
                                {this.state.players.map((item) => {
                                    return item.isBlue == true && item.isSpy == false ? <p onClick={() => this.friendModal(item)}>{item.userName}</p> : null
                                })}
                                {this.state.room.bluePlayerRobot &&
                                    <div class="row">
                                        <img src={robot} alt="Robot" height={70} width={70}/>
                                        {this.state.bluePlayerThinking && 
                                            <img class="cloud" src={cloud} alt="Cloud" height={70} width={70}/>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <h1>A szó:</h1>
                            {hasWord &&
                                <div>
                                    <Card style={{ backgroundColor: wordColor }}>{this.state.room.currentWord}</Card>
                                    <Card style={{ backgroundColor: wordColor }}>{this.state.room.currentNumber}</Card>
                                    <Card style={{ backgroundColor: wordColor }} onClick={this.pass}>Passz</Card>
                                </div>
                            }
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
                            <Chat id={this.state.room.id}/>
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
                        <PopUp show={this.state.show} onOk={this.modalOk} onCancel={this.modalCancel} friend={this.state.friend} />
                    </div>
                </div>
            )

        else return (
            <div class="container">
                <div class="row">
                    <div class="col-sm-3 d-flex pb-3">
                        <div class="card card-block card-fill grad-red">
                            <div onClick={() => this.changeSide(false, false)} >
                                <h1>Piros játékosok</h1>
                                {this.state.players.map((item) => {
                                    return !this.state.redPlayerRobot && item.isBlue == false && item.isSpy == false ? <p>{item.userName}</p> : null
                                })}
                                {this.state.redPlayerRobot && <img src={robot} alt="Robot" height={70} width={70}/>}   
                            </div>
                            <br />
                            <div>
                                <input
                                    type="checkbox"
                                    name="redPlayerRobot"
                                    value={this.state.redPlayerRobot}
                                    checked={this.state.redPlayerRobot}
                                    onChange={this.handleInputChange}
                                    ref="complete"
                                />
                                <label>Robot</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">

                    </div>
                    <div class="col-sm-3 d-flex pb-3">
                        <div class="card card-block card-fill grad-blue">
                            <div onClick={() => this.changeSide(true, false)}>
                                <h1>Kék játékosok</h1>
                                {this.state.players.map((item) => {
                                    return !this.state.bluePlayerRobot && item.isBlue == true && item.isSpy == false ? <p>{item.userName}</p> : null
                                })}
                                {this.state.bluePlayerRobot && <img src={robot} alt="Robot" height={70} width={70}/>}             
                            </div>
                            <br />
                            <div>
                                <input
                                    type="checkbox"
                                    name="bluePlayerRobot"
                                    value={this.state.bluePlayerRobot}
                                    checked={this.state.bluePlayerRobot}
                                    onChange={this.handleInputChange}
                                    ref="complete"
                                />
                                <label>Robot</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 d-flex pb-3">
                        <div class="card card-block card-fill grad-red">
                            <div onClick={() => this.changeSide(false, true)}>
                                <h1>Kém</h1>
                                {this.state.players.map((item) => {
                                    return !this.state.redSpyRobot && item.isBlue == false && item.isSpy == true ? <p>{item.userName}</p> : null
                                })}
                                {this.state.redSpyRobot && <img src={robot} alt="Robot" height={70} width={70}/>}
                            </div>
                            <br />
                            <div>
                                <input
                                    type="checkbox"
                                    name="redSpyRobot"
                                    value={this.state.redSpyRobot}
                                    checked={this.state.redSpyRobot}
                                    onChange={this.handleInputChange}
                                    ref="complete"
                                />
                                <label>Robot</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 d-flex justify-content-center">
                        <button type="button" class="btn grad-green" onClick={() => this.startGame()}>Játék indítása</button>
                    </div>
                    <div class="col-sm-3 d-flex pb-3">
                        <div class="card card-block card-fill grad-blue" >
                            <div onClick={() => this.changeSide(true, true)}>
                                <h1>Kém</h1>
                                {this.state.players.map((item) => {
                                    return !this.state.blueSpyRobot && item.isBlue == true && item.isSpy == true ? <p>{item.userName}</p> : null
                                })}
                                {this.state.blueSpyRobot && <img src={robot} alt="Robot" height={70} width={70}/>}
                            </div>
                            <br />
                            <div>
                                <input
                                    type="checkbox"
                                    name="blueSpyRobot"
                                    value={this.state.blueSpyRobot}
                                    checked={this.state.blueSpyRobot}
                                    onChange={this.handleInputChange}
                                    ref="complete"
                                />
                                <label>Robot</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
