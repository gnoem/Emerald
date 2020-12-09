import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Canvas from './Canvas';
import { User } from './User';

const socket = io();

function Game(props) {
    const [ lastMovedUser, updateLastMovedUser ] = useState('');
    const [ users, updateUsers ] = useState([]);
    useEffect(() => {
        socket.emit('user-connected', props.userData);
        socket.emit('hey', (onlineUsers) => {
            const whosOnline = [];
            onlineUsers.forEach(onlineUser => {
                const { id, userData, coordinates } = onlineUser;
                const instance = <User userData={userData} key={id} id={id} position={coordinates} />;
                whosOnline.push({ id, userData, instance, coordinates });
            });
            updateUsers(whosOnline);
        });
        socket.on('user-connected', ({ id, userData }) => {
            if (id === socket.id) return;
            console.log(`A user ${id} connected!`);
            const newUser = <User userData={userData} key={id} id={id} position={{ x: 0, y: 0 }} />;
            updateUsers(userList => [...userList, { id, userData, instance: newUser, coordinates: { x: 0, y: 0 } }]);
        });
        socket.on('user-disconnected', (id) => {
            console.log('A user disconnected');
            updateUsers(userList => userList.filter(user => {
                return user.id !== id;
            }));
        });
        socket.on('user-move', ({ id, coordinates }) => {
            updateUsers(userList => {
                const thisUser = userList.find(user => user.id === id);
                const thisUserIndex = userList.findIndex(user => user.id === id);
                const userData = thisUser.instance.props.userData;
                thisUser.coordinates = coordinates;
                thisUser.instance = <User userData={userData} key={id} id={id} position={coordinates} />;
                userList[thisUserIndex] = thisUser;
                return userList;
            });
            // force Canvas to update anytime anybody moves:
            updateLastMovedUser({ id: id, time: Date.now() });
        });
    }, []);
    return (
        <div className="Game">
            <Canvas users={users} playerData={props.userData} socket={socket} lastMovedUser={lastMovedUser} />
        </div>
    )
}

export default Game;