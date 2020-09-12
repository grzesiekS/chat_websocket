const express = require('express');
const path = require('path');
const socket = require('socket.io');

const messages = [
    {user: 'John Doe', message: 'Hello'},
    {user: 'Steven', message: 'Hello! How are You?'}
];

const users = [];

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    socket.on('login', (user) => {
        users.push({...user, id: socket.id});
        socket.broadcast.emit('addNewUser', {user: 'ChatBot', message: `${user.user} has joined the conversation!`});
        console.log(`New user: ${user.user} id: ${socket.id}`);
    });

    socket.on('message', (message) => {
        messages.push(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('disconnect', () => {
        const removedUser = users.filter(user => user.id === socket.id)[0];
        if(removedUser !== undefined) {
            users.splice(users.indexOf(removedUser),1);
            socket.broadcast.emit('removeUser', {user: 'ChatBot', message: `${removedUser.user} has left the conversation!`});
            console.log(`I've deleted user with id: ${socket.id}`);
        }
    });
});