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

const messages: Array<any> = []

const usersState = new Map()


socket.on('connection', (socketChanel) => {

    usersState.set(socketChanel, {id: new Date().getTime().toString(), name: 'anonymous'})

    socket.on('disconnect', () => {
        usersState.delete(socketChanel)
    })

    socketChanel.on('client-name-sent', (name: string) => {
        const user = usersState.get(socketChanel)
        user.name = name
    })

    socketChanel.on('client-typing', () => {
        socketChanel.broadcast.emit('user-typing', usersState.get(socketChanel))
    })

    socketChanel.on('client-message-sent', (message: string, successFn) => {
        if (typeof message !== 'string' || message.length > 20) {
            successFn('Message length should be less than 20 chars')
            return
        }

        const user = usersState.get(socketChanel)

        let messageItem = {
            id: new Date().getTime().toString(),
            message: message,
            user: {id: user.id, name: user.name}
        }
        messages.push(messageItem)

        socket.emit('new-message-sent', messageItem)

        successFn(null)
    });

    socketChanel.emit('init-messages-published', messages, () => {
        console.log('init messages received')
    })

    console.log('a user connected');
});


server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});