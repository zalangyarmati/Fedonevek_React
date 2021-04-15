import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './New.css';


export class SpyCard extends Component {
    static displayName = SpyCard.name;

    constructor() {
        super();
    }

    render() {
        let color
        if (this.props.card.color == "0") {
            color = "#a9a9a9"
        }
        else if (this.props.card.color == "1") {
            color = "#0275d8"
        }
        else if (this.props.card.color == "2") {
            color = "#d9534f"
        }
        else if (this.props.card.color == "3") {
            color = "#000000";
        }
        return (
            <Card  style={{ backgroundColor: color, margin: 3 }}></Card>
        )     
    }
}