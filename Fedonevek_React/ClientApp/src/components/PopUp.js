import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap';

export class PopUp extends Component {

    componentDidMount() {

    }

    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.toggle();
    };
    render() {
        return (
            <Modal  {...this.props}>
                <Modal.Header closeButton onClick={this.props.onCancel}>
                    <Modal.Title>Barát jelölés</Modal.Title>
                </Modal.Header>
                <Modal.Body>Szeretnéd barátnak jelölni {this.props.friend.userName} -t?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onCancel}>
                        Vissza
                    </Button>
                    <Button variant="primary" onClick={() => this.props.onOk(this.props.friend.userId)}>
                        Jelölés
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}