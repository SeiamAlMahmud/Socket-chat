const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const os = require('os')

console.log(os.cpus().length)

const app = express();
const server = http.createServer(app)

const io = new Server(server);

io.on('connection', (socket)=> {
    console.log('new user connected');


    socket.on('chat', (msg)=> {
        console.log(msg)
        io.emit('chat_transfer', msg)
    })
    socket.on('disconnect', ()=>{
        console.log('new user disconnect')
    })
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})




server.listen(3000, () => {
    console.log('server started')
})