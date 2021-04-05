const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io")

const app = express();
const server = http.createServer(app)
const io = socketio(server)

// set up public folder to static
app.use(express.static(path.join(__dirname, "public")))

// Run when client connects
io.on("connection", (socket) => {
    // Welcome user
    socket.emit("message", "welcome to this chat");

    // Brodcast when user connect
    socket.broadcast.emit("message", "user has been connected");

    // Runs when client disconnects
    socket.on("disconnect", () => {
        io.emit("message", "user has beeen disconnected")
    })

    // listen for chatMessage
    socket.on("chatMessage", (msg) => {
        io.emit("message", msg)
    })
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    console.log("Server running on " + PORT)
})

