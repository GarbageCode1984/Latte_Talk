const express = require("express");
const router = express.Router();
const User = require("../models/User");
Room = require("../models/Room");
Message = require("../models/Message");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/register", async (req, res, next) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send("이미 사용 중인 이메일입니다.");
        }

        const user = User(req.body);
        await user.save();
        return res.sendStatus(200);
    } catch (err) {
        next(err);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send("Auth failed, email not found");
        }

        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(400).send("Wrong password");
        }

        const payload = {
            userId: user._id.toString(),
        };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.json({ user, accessToken });
    } catch (err) {
        next(err);
    }
});

router.get("/auth", auth, async (req, res) => {
    return res.status(200).json({
        _id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        profileImage: req.user.profileImage,
    });
});

router.delete("/DeleteAccount", async (req, res, next) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            res.status(400).json({ error: "유저가 없습니다." });
        }
        await Room.deleteMany({ creator: userId });
        await Message.deleteMany({ userId: userId });
        await User.deleteOne({ _id: userId });

        res.status(200).send("계정을 삭제했습니다.");
    } catch (err) {
        next(err);
    }
});
module.exports = router;
