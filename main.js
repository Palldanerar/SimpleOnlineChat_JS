const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.use(express.static(__dirname + '/assets'))

io.on('connection', (socket) => {
    socket.on('chat message', (data) => {
        io.emit('chat message', {
            message: data.message,
            name: data.name,
            color: data.color,
            avatar: data.avatar
        })
    })
})

http.listen(3000, () => {
    console.log("Работает!")
})