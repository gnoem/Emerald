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
            },
            orientation: 's'
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
            if (e.key === 'ArrowUp') {
                this.setState({ orientation: 'n' });
                this.move('y', -1);
            }
            if (e.key === 'ArrowDown') {
                this.setState({ orientation: 's' });
                this.move('y', 1);
            }
            if (e.key === 'ArrowLeft') {
                this.setState({ orientation: 'w' });
                this.move('x', -1);
            }
            if (e.key === 'ArrowRight') {
                this.setState({ orientation: 'e' });
                this.move('x', 1);
            }
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
        let { type, id, user, position } = this.props;
        const { avatar } = user;
        let { coordinates } = this.state;
        let userPosition = {
            x: (type === 'player') ? coordinates.x : position.x,
            y: (type === 'player') ? coordinates.y : position.y
        }
        if (!type) type = '';
        return (
            <div ref={this.User} className={`${type} user`} data-id={id} style={{transform: `translate3d(${userPosition.x * 10}px, ${userPosition.y * 10}px, 0)`}}>
                <div className="userAvatar">
                    <Avatar {...avatar} orientation={this.state.orientation} />
                    <span className="userLabel">
                        {user.username} - {this.state.orientation}
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


function Avatar(props) {
    const { orientation, bodyColor, eyes, mouth, faceAccessory } = props;
    return (
        <>
            <Body color={bodyColor} orientation={orientation} />
            <Eyes id={eyes} orientation={orientation} />
            <Mouth id={mouth} orientation={orientation} />
            <FaceAccessory id={faceAccessory} orientation={orientation} />
        </>
    )
}

export { Player, User }