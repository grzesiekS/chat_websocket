const express = require('express');
const path = require('path');

const messages = [
    {user: 'John Doe', message: 'Hello'},
    {user: 'Steven', message: 'Hello! How are You?'}
];

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});