const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 12,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 8,
    },
    role: {
        type: String,
        default: 0,
    },
    profileImage: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
