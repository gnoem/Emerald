import React, { Component } from 'react';
import { Player } from './User';

class Canvas extends Component {
    componentDidMount() {
        this.createPlayer();
    }
    createPlayer = () => {
        const { socket, playerData } = this.props;
        return (
            <Player user={playerData} id={socket.id} socket={socket} position={{ x: 0, y: 0 }} />
        )
    }
    render() {
        const { users, socket } = this.props;
        const loadUsers = () => {
            const userInstances = [];
            for (let i = 0; i < users.length; i++) {
                if (users[i].id !== socket.id) userInstances.push(users[i].instance);
            }
            return userInstances;
        }
        return (
            <div className="Canvas">
                {this.createPlayer()}
                {loadUsers()}
            </div>
        )
    }
}

export default Canvas;