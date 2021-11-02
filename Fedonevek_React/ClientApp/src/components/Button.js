import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './Styles.css';


export class Button extends Component {
    static displayName = Button.name;

    constructor() {
        super();
    }

    render() {
        var wordLength = this.props.card.word.length
        let textsize
        if (wordLength > 7) {
            textsize = "8px";
        }
        else if (wordLength > 5) {
            textsize = "10px";
        }
        else if (wordLength > 4) {
            textsize = "12px";
        }
        else {
            textsize = "16px";
        }

        let color
        if (this.props.card.color == "0" && this.props.card.revealed == 1) {
            color = "#a9a9a9"
        }
        else if (this.props.card.color == "1" && this.props.card.revealed == 1) {
            color = "#0275d8"
        }
        else if (this.props.card.color == "2" && this.props.card.revealed == 1) {
            color = "#d9534f"
        }
        else if (this.props.card.color == "3" && this.props.card.revealed == 1) {
            color = "#000000";
        }
        return (
            <Card class="btn card rel d-flex justify-content-center" style={{ backgroundColor: color, fontSize: textsize }} onClick={() => this.props.handleClick(this.props.card.id)}>
                {this.props.card.word}
            </Card>)
    }
}