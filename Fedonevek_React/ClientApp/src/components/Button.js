import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './New.css';


export class Button extends Component {
    static displayName = Button.name;

    constructor() {
        super();
        this.state = {
            color: "FF2222",
            clicked: false
        }

    }

    changeClicked() {
        if (this.state.clicked == false) {
            if (this.props.team == "1") {
                this.props.bc()
            }
            if (this.props.team == "2") {
                this.props.rc()
            }
        }

        this.setState({
            clicked: true
        })
    }

    render() {
        let textsize
        if (this.props.word.length > 6) {
            textsize = "12px";
        }
        else {
            textsize = "16px";
        }

        let color
        if (this.props.card.color == "0" && this.props.card.revealed == 1) {
            color = "#a9a9a9"
        }
        else if (this.props.card.color == "1" && this.props.card.revealed == 1){
            color = "#2222ff"
        }
        else if (this.props.card.color == "2" && this.props.card.revealed == 1) {
            color = "#ff2222"
        }
        else if (this.props.card.color == "3" && this.props.card.revealed == 1) {
            color = "#000000";
        }
        return (
            <Card class="btn card d-flex justify-content-center" style={{ backgroundColor: color, fontSize: textsize}} onClick={() => this.props.handleClick(this.props.card.id)}>
                {this.props.word}
            </Card>)
    }
}