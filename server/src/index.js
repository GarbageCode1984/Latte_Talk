const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const server = http.createServer(app);
const dotenv = require("dotenv");
dotenv.config();
const PORT = 5000;
const io = socketIo(server);

app.use(
    cors({
        origin: [
            "https://port-0-latte-talk-jvpb2mloe372no.sel5.cloudtype.app/",
            "https://web-latte-talk2-jvpb2mloe372no.sel5.cloudtype.app/",
            "http://localhost:5173",
            "https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2",
        ],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    })
);

app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        "https://port-0-latte-talk-jvpb2mloe372no.sel5.cloudtype.app/",
        "https://web-latte-talk2-jvpb2mloe372no.sel5.cloudtype.app/",
        "http://localhost:5173",
        "https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

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

app.get("/", (req, res) => {
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
