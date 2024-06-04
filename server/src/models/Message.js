const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema({
    user: String,
    userId: String,
    message: String,
    sendDate: { type: Date, default: Date.now },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
    },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
