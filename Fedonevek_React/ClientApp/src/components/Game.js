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
            string: ""
        }

        this.redClicked = this.redClicked.bind(this);
        this.blueClicked = this.blueClicked.bind(this);
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
    }

    render() {
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
                            <Button team={this.state.cardlist[0].team} word={this.state.cardlist[0].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[1].team} word={this.state.cardlist[1].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[2].team} word={this.state.cardlist[2].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[3].team} word={this.state.cardlist[3].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[4].team} word={this.state.cardlist[4].word} bc={this.blueClicked} rc={this.redClicked}/>
                </CardDeck>
                <CardDeck style={{ padding: 12 }}>
                            <Button team={this.state.cardlist[5].team} word={this.state.cardlist[5].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[6].team} word={this.state.cardlist[6].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[7].team} word={this.state.cardlist[7].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[8].team} word={this.state.cardlist[8].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[9].team} word={this.state.cardlist[9].word} bc={this.blueClicked} rc={this.redClicked}/>
                </CardDeck>
                <CardDeck style={{ padding: 12 }}>
                            <Button team={this.state.cardlist[10].team} word={this.state.cardlist[10].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[11].team} word={this.state.cardlist[11].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[12].team} word={this.state.cardlist[12].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[13].team} word={this.state.cardlist[13].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[14].team} word={this.state.cardlist[14].word} bc={this.blueClicked} rc={this.redClicked}/>
                </CardDeck>
                <CardDeck style={{ padding: 12 }}>
                            <Button team={this.state.cardlist[15].team} word={this.state.cardlist[15].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[16].team} word={this.state.cardlist[16].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[17].team} word={this.state.cardlist[17].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[18].team} word={this.state.cardlist[18].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[19].team} word={this.state.cardlist[19].word} bc={this.blueClicked} rc={this.redClicked}/>
                </CardDeck>
                <CardDeck style={{ padding: 12 }}>
                            <Button team={this.state.cardlist[20].team} word={this.state.cardlist[20].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[21].team} word={this.state.cardlist[21].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[22].team} word={this.state.cardlist[22].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[23].team} word={this.state.cardlist[23].word} bc={this.blueClicked} rc={this.redClicked}/>
                            <Button team={this.state.cardlist[24].team} word={this.state.cardlist[24].word} bc={this.blueClicked} rc={this.redClicked}/>
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
