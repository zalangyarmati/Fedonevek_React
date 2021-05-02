import React, { Component } from 'react';
import  Picker  from 'emoji-picker-react';
import jsemoji from 'emoji-js'

export class Emojis extends Component {
    static displayName = Emojis.name;

    emojiClicked = (code, emoji) => {
        let emojiPic = jsemoji.replace_colons(`:${emoji.name}:`);

        console.log("clicked emoji")
    }

    constructor() {
        super();
    }


    render() {
        return (
            <Picker onEmojiClick={this.emojiClicked} />
        )
    }

}