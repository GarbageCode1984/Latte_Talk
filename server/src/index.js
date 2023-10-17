const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const port = 5000;

app.use(express.json());

io.on("connection", socket => {
    console.log("유저 접속");

    socket.on("message", message => {
        console.log(message);
        io.emit("message", message);
    });

    socket.on("disconnect", () => {
        console.log("접속 종료");
    });

    socket.on("error", error => {
        console.error(error);
    });
});

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

server.listen(port, () => {
    console.log("서버 실행 중...");
});
