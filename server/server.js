const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '../client/public')));

const users = [];
const getIndex = (id) => {
    return users.findIndex(user => user.id === id);
}
io.on('connection', (socket) => {
    socket.on('hey', (cb) => {
        cb(users);
    });
    socket.on('user-connected', (user) => {
        users.push({ id: socket.id, user, coordinates: { x: 0, y: 0 } });
        io.emit('user-connected', { id: socket.id, user });
        console.log(`Client ${socket.id} connected`);
    });
    socket.on('disconnect', () => {
        const index = getIndex(socket.id);
        users.splice(1, index);
        io.emit('user-disconnected', socket.id);
        console.log(`Client ${socket.id} disconnected`);
    });
    socket.on('user-move', (coordinates) => { // this is firing twice?
        const index = getIndex(socket.id);
        users[index].coordinates = coordinates;
        io.emit('user-move', { id: socket.id, coordinates });
    });
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/config/db')();
require('./app/routes')(app);

const PORT = 6000;
server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}.`);
});