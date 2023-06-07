const express = require('express')
const http = require('http')
const Server = require("socket.io").Server
const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    console.log('User connected')

    socket.on('chat', chat => {
        io.emit('chat', chat)
    })

    socket.on('dicsconnect', () => {
        console.log('User disconnected')
    })
})

server.listen(5173, () => {
    console.log('Server is running on port 5173')
})