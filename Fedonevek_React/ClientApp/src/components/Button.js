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
        if (this.props.team == "0" && this.state.clicked) {
            color = "#ffffff"
        }
        else if (this.props.team == "1" && this.state.clicked){
            color = "#2222ff"
        }
        else if (this.props.team == "2" && this.state.clicked) {
            color = "#ff2222"
        }
        else if (this.props.team == "3" && this.state.clicked) {
            color = "#000000"
        }
        return (
            <Card class="btn card d-flex justify-content-center" style={{ backgroundColor: color, fontSize: textsize }} onClick={this.changeClicked.bind(this)}>
                {this.props.word}
            </Card>)
    }
}