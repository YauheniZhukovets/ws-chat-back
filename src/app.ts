import express from 'express'
import http from 'http'
import { Server } from "socket.io"

const PORT = process.env.PORT || 3009
const app = express();
const server = http.createServer(app);
const socket = new Server(server);

app.get('/', (req, res) => {
    res.send('Hello it\'s ws server');
});

socket.on('connection', (connection) => {
    console.log('a user connected');
});

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});