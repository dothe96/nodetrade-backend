const express = require('express');
const cors = require('cors');
const { append } = require('express/lib/response');
require('dotenv').config();

const server = express();
const SERVER_PORT = process.env.SERVER_PORT || 3000;

// middlewares
server.use(cors());
server.use(express.json());

// routes

// server status
server.get('/', (req, res) => {
    res.json({ status: 'running', message: `nodtrade-backend is running on port ${SERVER_PORT}` });
});

// not found handler
server.use((req, res) => {
    if (req.method.toLowerCase() === "options") {
        res.end();
    } else {
        res.status(404).json({ message: "Not Found" });
    }
});

// error handler
server.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

// start server
server.listen(SERVER_PORT, err => {
    if (err) {
        console.error(`Cannot start server ${err}`);
        return;
    }
    console.log(`Server is running on port ${SERVER_PORT}`);
 });
