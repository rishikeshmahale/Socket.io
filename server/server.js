import express from "express";
const app = express();
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";


const port = 3000;

const server = createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "*",
        methods : ['GET', 'POST'],
        credentials : true
    }
});


io.on("connection", (socket) => {
    console.log('User connected');
    console.log("id", socket.id);

    socket.emit("welcome", `Welcome to the server, ${socket.id}`);

    socket.broadcast.emit("welcome", `${socket.id} joined the message`);

});




app.get("/" , (req, res) => {
    res.json({
        message : "HELLO"
    })
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})