import express from 'express'
import cors from 'cors'
import http from 'http'
import {Server} from 'socket.io'

const PORT = process.env.PORT || 3009
const app = express();
const server = http.createServer(app);
const socket = new Server(server, {cors: {origin: '*'}});


app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello it\'s ws server');
});

const messages = [
    {id: '12j12', message: 'Hello Viktor', user: {id: '2323kkkk23', name: 'Dimych'}},
    {id: '1222j12', message: 'Hello Dimych', user: {id: '23221kk23', name: 'Viktor'}}
]

socket.on('connection', (socketChanel) => {

    socketChanel.on('client-message-sent', (message: string) => {
        let messageItem = {
            id: '1222j12',
            message: message,
            user: {id: '23221' + new Date().getTime(), name: 'Viktor'}
        }
        messages.push(messageItem)

        socket.emit('new-message-sent', messageItem)
    });

    socketChanel.emit('init-messages-published', messages)

    console.log('a user connected');
});


server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});