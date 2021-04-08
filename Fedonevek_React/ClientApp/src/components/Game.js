import React, { Component } from 'react';
import { Card, CardDeck, Modal } from 'react-bootstrap';
import './New.css';
import { Button } from './Button';
import { Chat } from './Chat';
import cardsData from "./Dummy";

export class Game extends Component {
    static displayName = Game.name;

    constructor() {
        super();
        this.state = {
            buttonList: [
                { team: "0", word: "szo1" },
                { team: "1", word: "szo2" },
                { team: "1", word: "szo3" },
                { team: "0", word: "szo4" },
                { team: "2", word: "szo5" },
            ],
            cardlist: cardsData,
            blue: 8,
            red: 7,
            black: 1,
            ended: false,
            string: "",
            cards: []
        }

        this.redClicked = this.redClicked.bind(this);
        this.blueClicked = this.blueClicked.bind(this);
        this.cardClicked = this.cardClicked.bind(this);
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        console.log(id);
        const string = `https://localhost:5001/api/rooms/${id}/cards`
        console.log(string);
        await fetch(`https://localhost:5001/api/rooms/${id}/cards`)
            .then(response => response.json())
            .then(response => this.setState({ cards: response }));
        //console.log(this.state.cards[0].word);
        this.state.cards.map(function (item, index) {
            console.log(item.word);
        })

        console.log("ok");
    }

    redClicked() {
        this.setState({
            red: this.state.red - 1 
        });
        if (this.state.red == 0) {
            this.setState({
                ended: true,
                string: "Piros nyert"
            });
        }
    }

    blueClicked() {
        this.setState({
             blue: this.state.blue - 1 
        });
        if (this.state.blue == 0) {
            this.setState({
                ended: true,
                string: "Kek nyert"
            });
        }
        console.log("blue clicked");
    }

    cardClicked(id) {
        console.log(`clicked ${id}`);
    }

    render() {
        if (!this.state.cards) {
            return <div />
        }
        let string
        if (this.state.blue == 0 ) {
            string = "Kek nyert";
        }
        else if (this.state.red == 0){
            string = "Piros nyert";
        }
        return (
            <div class="container">
            <div class="row">
                <div class="col-sm-3 d-flex pb-3">
                        <div class="card card-block card-fill  bg-danger">
                            <h1>{this.state.red}</h1>
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
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <h1>A szó:</h1>
                        <p>valami</p>
                    </div>

                    <div class="col-6">
                        <Chat/>
                    </div>
                    <div>
                        <h1>{string}</h1>
                    </div>
                </div>
                <div class="row">


                </div>
            </div>
        )
    }
}
