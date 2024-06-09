const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const Message = require("../models/Message");

router.post("/create", async (req, res, next) => {
    try {
        const { roomName, roomPassword, userId } = req.body;

        const chatRoom = new Room({
            roomName,
            roomPassword,
            creator: userId,
        });
        const savedChatRoom = await chatRoom.save();
        return res.status(200).json(savedChatRoom);
    } catch (err) {
        next(err);
    }
});

router.post("/getRoom", async (req, res, next) => {
    try {
        const rooms = await Room.find({});
        const roomsWithPassword = rooms.map(room => {
            const { roomPassword, ...roomsWithPassword } = room._doc;
            return {
                ...roomsWithPassword,
                isPasswordProtected: !!room.roomPassword,
            };
        });
        res.json(roomsWithPassword);
    } catch (err) {
        next(err);
    }
});

router.post("/checkRoom", async (req, res, next) => {
    try {
        const { roomId, password } = req.body;
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(400).send("생성된 방이 없습니다.");
        }

        const isMatch = await room.comparePassword(password);
        if (isMatch) {
            res.json({ success: true });
        } else {
            return res.status(400).send("채팅방 비밀번호가 틀립니다.");
        }
    } catch (err) {
        next(err);
    }
});

router.delete("/deleteRoom", async (req, res, next) => {
    try {
        const { roomId, userId } = req.body;
        const chatRoom = await Room.findById(roomId);
        if (!chatRoom) {
            return res.status(400).send("채팅방이 존재하지 않습니다.");
        }
        if (chatRoom.creator.toString() !== userId) {
            return res.status(400).send("채팅방 삭제 권한이 없습니다.");
        }

        await Message.deleteMany({ roomId: roomId });
        await Room.deleteOne({ _id: roomId });
        return res.status(200).send("채팅방을 삭제했습니다.");
    } catch (err) {
        next(err);
    }
});

module.exports = router;
