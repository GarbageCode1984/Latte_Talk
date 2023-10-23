const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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

module.exports = router;
