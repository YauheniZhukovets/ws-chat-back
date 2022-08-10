import express from 'express'
import cors from 'cors'
import http from 'http'

const PORT = process.env.PORT || 3009
const app = express();
const server = http.createServer(app);

const socket = require('socket.io')(server, {cors: {origin: "*"}});


app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello it\'s ws server');
});

socket.on('connection', (connection) => {
    console.log('a user connected');
});

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});