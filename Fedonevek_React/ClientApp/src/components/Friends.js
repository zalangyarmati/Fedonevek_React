import React, { Component } from 'react';
import './Styles.css';
import { CardContainer, CardContent} from './Parallax'

export class Friends extends Component {
    static displayName = Friends.name;

    constructor() {
        super();
    }

    render() {
        return (
            <CardContainer>
                <CardContent alignment={this.props.alignment}>
                            <div class="card-header bg-transparent col d-flex justify-content-center">
                                <h4>Barátok</h4>
                            </div>
                            <div class="card-body">
                                {this.props.friends.map(function (item) {
                                    return <div class="mt-2 d-flex justify-content-center p-2" style={{ borderRadius: '12px', fontWeight: 'bold', color: 'black' }}>
                                        {item.userName}
                                    </div>
                                    
                                })}
                            </div>
                </CardContent>
            </CardContainer>
        )
    }
}