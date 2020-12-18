import React, { Component } from 'react';
import { Body, Eyes, Mouth, FaceAccessory } from './Avatar';

class User extends Component {
    constructor(props) {
        super(props);
        this.User = React.createRef();
        const { type, position } = this.props;
        this.state = {
            coordinates: { // player only - other users get position object from props
                x: position.x,
                y: position.y
            }
        }
        if (type === 'player') this.initMovement();
    }
    componentDidMount() {
        const { type, position } = this.props;
        const { coordinates } = this.state;
        this.User.current.addEventListener('click', () => {
            let userPosition = {
                x: (type === 'player') ? coordinates.x : position.x,
                y: (type === 'player') ? coordinates.y : position.y
            }
            console.log(`User ${this.props.id}: ${userPosition.x}, ${userPosition.y}`);
        });
    }
    initMovement = () => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') this.move('y', -1);
            if (e.key === 'ArrowDown') this.move('y', 1);
            if (e.key === 'ArrowLeft') this.move('x', -1);
            if (e.key === 'ArrowRight') this.move('x', 1);
        });
    }
    isMoveAllowed = (axis, direction) => { // todo max coordinates
        const { coordinates, maxCoordinates } = this.state;
        return coordinates[axis] + direction <= maxCoordinates[axis]
        // check negative direction:
        && coordinates[axis] + direction >= maxCoordinates[axis] * -1;
    }
    move = (axis, direction) => {
        const { coordinates } = this.state;
        const x = (axis === 'x')
            ? coordinates.x + direction
            : coordinates.x;
        const y = (axis === 'y')
            ? coordinates.y + direction
            : coordinates.y;
        this.setPosition({ x, y });
    }
    setPosition = ({ x, y }) => {
        let { coordinates } = this.state;
        const { socket } = this.props;
        this.setState({ coordinates: { x: x, y: y } }, () => {
            if (socket) socket.emit('user-move', coordinates);
        });
    }
    render() {
        console.dir(this.props);
        let { type, id, user, position } = this.props;
        const { avatar } = user;
        let { coordinates } = this.state;
        let userPosition = {
            x: (type === 'player') ? coordinates.x : position.x,
            y: (type === 'player') ? coordinates.y : position.y
        }
        if (!type) type = '';
        return (
            <div ref={this.User} className={`${type} user`} data-id={id} style={{transform: `translate3d(${userPosition.x * 20}px, ${userPosition.y * 20}px, 0)`}}>
                <div className="userAvatar">
                    <Body color={avatar.bodyColor} />
                    <Eyes id={avatar.eyes} />
                    <Mouth id={avatar.mouth} />
                    <FaceAccessory id={avatar.faceAccessory} />
                    <span className="userLabel">
                        {user.username}
                    </span>
                </div>
            </div>
        )
    }
}

class Player extends Component {
    render() {
        return (
            <User type="player" {...this.props} />
        )
    }
}

export { Player, User }