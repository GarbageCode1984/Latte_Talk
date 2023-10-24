const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/register", async (req, res, next) => {
    try {
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

module.exports = router;
