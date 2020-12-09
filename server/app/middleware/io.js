module.exports = (req, res) => {
    console.log('socket supposedly on');
    const io = req.app.get('socketio');
    const users = [];
    const getIndex = (id) => {
        return users.findIndex(user => user.id === id);
    }
    io.on('connection', (socket) => {
        socket.on('hey', (cb) => {
            cb(users);
        });
        socket.on('user-connected', () => {
            users.push({ id: socket.id, coordinates: { x: 0, y: 0 } });
            io.emit('user-connected', socket.id);
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
    res.send({
        success: true
    });
}