import React, { Component } from 'react';
import  Picker  from 'emoji-picker-react';
import jsemoji from 'emoji-js'

export class Emojis extends Component {
    static displayName = Emojis.name;

    emojiClicked = (code, emoji) => {
        this.props.handleClick(emoji);
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Picker onEmojiClick={this.emojiClicked} />
        )
    }

}