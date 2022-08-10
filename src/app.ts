import express from 'express'
import http from 'http'

const PORT = process.env.PORT || 3009
const app = express();
const server = http.createServer(app);

const sio = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});


app.get('/', (req, res) => {
    res.send('Hello it\'s ws server');
});

sio.on('connection', (connection) => {
    console.log('a user connected');
});

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});