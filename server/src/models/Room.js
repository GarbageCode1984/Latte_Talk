const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const roomSchema = mongoose.Schema({
    roomName: {
        type: String,
        maxLength: 16,
        required: true,
    },
    roomPassword: {
        type: String,
        minLength: 4,
        maxLength: 32,
        required: false,
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

roomSchema.pre("save", async function (next) {
    let room = this;
    if (!room.isModified("roomPassword")) {
        return next();
    }

    if (room.roomPassword) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(room.roomPassword, salt);
            this.roomPassword = hash;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});
roomSchema.methods.comparePassword = async function (plainPassword) {
    let room = this;
    const match = await bcrypt.compare(plainPassword, room.roomPassword);
    return match;
};
roomSchema.pre("remove", async function (next) {
    await this.model("Message").deleteMany({ chatRoomId: this._id });
    next();
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
