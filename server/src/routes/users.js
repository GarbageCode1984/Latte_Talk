const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res, next) => {
    try {
        const user = User(req.body);
        await user.save();
        return res.sendStatus(200);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
