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
const port = 5000;
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

app.get("/", (req, res, next) => {
    res.send("Hello World!");
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

app.use("/users", require("./routes/users"));

server.listen(port, () => {
    console.log("서버 실행 중...");
});

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
