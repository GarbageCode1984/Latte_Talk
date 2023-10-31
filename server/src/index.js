const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const server = http.createServer(app);
const dotenv = require("dotenv");
dotenv.config();
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB 연결 완료");
    })
    .catch(err => {
        console.log(err);
    });

app.use("/users", require("./routes/users"));

app.get("/users", (req, res) => {
    res.send("Hello");
});

server.listen(PORT, () => {
    console.log("서버 실행 중...");
});

const messages = [];

io.on("connection", socket => {
    console.log("유저 접속");

    socket.on("message", message => {
        console.log(message.user + ": " + message.text);
        messages.push(message);
        io.emit("message", message);
    });
    socket.emit("initialMessages", messages);

    socket.on("disconnect", () => {
        console.log("접속 종료");
    });

    socket.on("error", error => {
        console.error(error);
    });
});
