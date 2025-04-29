const express = require('express');
const { getMessagesBetweenUsers, getUnreadMessages } = require('../utility/messageUtility');
const CustomError = require('../utility/customError');
const sendResponse = require('../utility/sendResponse');
const Message = require('../models /messageModel');
const User = require('../models /userModel');

const MessageRoute = express.Router();

// MessageRoute.get('/unread', async (req, res) => {
//     try {
//         const grouped = {}
//         const unreadMessages = await Message.find({
//             receiver: req.user._id,
//             isRead: false,
//         }).sort({ timestamp: -1 }).populate('sender', 'username avatar');

//         if (!unreadMessages || unreadMessages.length === 0) {
//             throw new CustomError('Unread messages not found', 404, 'Request failed');
//         }
//         unreadMessages.forEach(msg => {
//             const senderId = msg.sender._id.toString();

//             if (!grouped[senderId]) {
//                 grouped[senderId] = {
//                     senderId,
//                     username: msg.sender.username,
//                     avatar: msg.sender.avatar,
//                     count: 1,
//                     lastMessage: {
//                         text: msg.text,
//                         timestamp: msg.timestamp,
//                     }
//                 };
//             } else {
//                 grouped[senderId].count += 1;
//             }
//         });
//         const result = Object.values(grouped);
//         return sendResponse(res, 200, false, "fetched unread message", result)

//     } catch (error) {
//         return sendResponse(res, error.statusCode || 500, true, error.message || "internal server error ")
//     }
// });
MessageRoute.get('/recent', async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user._id },
                { receiver: req.user._id }
            ]
        })
            .sort({ timestamp: -1 }) // sort latest first
            .populate('sender', 'username avatar')
            .populate('receiver', 'username avatar');


        if (!messages || messages.length === 0) {
            throw new CustomError('recent  messages not found', 404, "request failed")
        }
        const chatMap = new Map();

        messages.forEach(msg => {
            const isSender = msg.sender._id.toString() === req.user._id;
            const otherUser = isSender ? msg.receiver : msg.sender;
            const otherUserId = otherUser._id.toString();

            if (!chatMap.has(otherUserId)) {
                chatMap.set(otherUserId, {
                    userId: otherUserId,
                    username: otherUser.username,
                    avatar: otherUser.avatar,
                    lastMessage: {
                        text: msg.text,
                        timestamp: msg.timestamp,
                        isSender: isSender
                    },
                    unreadCount: 0
                });
            }
            if (!isSender && !msg.isRead) {
                const chat = chatMap.get(otherUserId);
                chat.unreadCount += 1;
            }

        });

        const chatList = Array.from(chatMap.values());
        return sendResponse(res, 200, false, "fetched recent chat ", chatList)
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "internal server error ")
    }

});
MessageRoute.put("/markAsRead/:id", async (req, res) => {
    try {
        const result = await Message.updateMany(
            {
                sender: req.params.id,
                receiver: req.user._id,
                isRead: false
            },
            { $set: { isRead: true } }
        );
        return sendResponse(res, 200, false, "read state updated successfully")
    } catch (error) {
        sendResponse(res, error.statusCode || 500, true, error.message || 'internal server error')
    }
})
MessageRoute.get('/history/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            throw new CustomError('user id is not valid ', 402, 'bad request')
        }
        const chatHistory = await Message.find({
            $or: [
                { sender: req.user._id, receiver: req.params.id },
                { sender: req.params.id, receiver: req.user._id }
            ]
        }).sort({ timestamp: -1 })
        if (!chatHistory || chatHistory.length === 0) {
            throw new CustomError('cannot find any chats ', 404, "bad request ")
        }
        return sendResponse(res, 200, false, "fetched all chat history", chatHistory)
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "internal server error ")
    }
})
MessageRoute.get('/users', async (req, res) => {
    try {
        const allOtherUsers = await User.find({ _id: { $ne: req.user._id } }).select('_id avatar username bio')
        if (!allOtherUsers || allOtherUsers.length === 0) {
            throw new CustomError('other users not found ', 404, "request failed ")
        }
        return sendResponse(res, 200, false, "all other users data fetched", allOtherUsers)
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "internal server error ")

    }
})
MessageRoute.get('/lastMessage/:id', (req, res) => {

    getMessagesBetweenUsers(req.user._id, req.params.id)
        .sort({ timestamp: -1 }) // latest first
        .limit(1)
        .lean()
        .then((message) => {
            if (message.length === 0) {
                throw new CustomError('cant get last message', 404, "request failed ")
            }
            return sendResponse(res, 200, false, "fetched last message with user", message)
        }).catch((error) => {
            return sendResponse(res, error.statusCode || 500, true, error.message || "internal server error ")
        })

})


module.exports = MessageRoute