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
const Message = require("./models/Message");
const schedule = require("node-schedule");

const io = socketIo(server, {
    cors: {
        origin: [
            // "https://web-latte-talk2-jvpb2mloe372no.sel5.cloudtype.app",
            "http://localhost:5173",
        ],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use(
    cors({
        origin: [
            // "https://web-latte-talk2-jvpb2mloe372no.sel5.cloudtype.app",
            "http://localhost:5173",
        ],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    })
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", [
        // "https://web-latte-talk2-jvpb2mloe372no.sel5.cloudtype.app",
        "http://localhost:5173",
    ]);
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
app.use("/rooms", require("./routes/rooms"));

server.listen(PORT, () => {
    console.log("서버 실행 중...");
});

const deleteMessageOlderThan24Hours = async () => {
    const currentTime = new Date();
    const oldTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
    try {
        const result = await Message.deleteMany({ sendDate: { $lt: oldTime } });
        console.log("삭제된 메세지 수:", result.deletedCount);
    } catch (error) {
        console.error("메시지 삭제 중 오류 발생:", error);
    }
};

schedule.scheduleJob("0 12 * * *", deleteMessageOlderThan24Hours);

const roomUsers = {};

io.on("connection", socket => {
    socket.on("joinRoom", async (roomId, userId) => {
        if (!roomUsers[roomId]) {
            roomUsers[roomId] = [];
        }
        const isUserAlreadyInRoom = roomUsers[roomId].includes(userId);
        if (!isUserAlreadyInRoom) {
            roomUsers[roomId].push(userId);
            socket.join(roomId);
        }
    });

    socket.on("requestInitialMessages", async roomId => {
        try {
            const initialMessages = await Message.find({ roomId }).sort({ sendDate: 1 }).limit(50);
            socket.emit("initialMessages", initialMessages);
        } catch (error) {
            console.error("초기 메시지 로딩 실패 :", error);
        }
    });

    socket.on("message", async message => {
        try {
            const savedMessage = await Message.create({
                ...message,
                sendDate: new Date(),
            });
            io.emit("message", savedMessage);
        } catch (e) {
            console.error("메시지 저장 실패", e);
        }
    });

    socket.on("leaveRoom", (roomId, userId) => {
        if (roomUsers[roomId]) {
            roomUsers[roomId] = roomUsers[roomId].filter(id => id !== userId);
        }
        socket.leave(roomId);
    });

    socket.on("error", error => {
        console.error(error);
    });
});
