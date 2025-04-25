// models/Message.js
const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        timestamp: { type: Date, default: Date.now },
    },

);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;

