const express = require('express');
const { getMessagesBetweenUsers, getUnreadMessages } = require('../utility/messageUtility');
const CustomError = require('../utility/customError');
const sendResponse = require('../utility/sendResponse');
const Message = require('../models /messageModel');
const User = require('../models /userModel');

const MessageRoute = express.Router();

MessageRoute.get('/unread', async (req, res) => {
    try {
        const grouped = {}
        const unreadMessages = await Message.find({
            receiver: req.user._id,
            isRead: false,
        }).sort({ timestamp: -1 }).populate('sender', 'username avatar');

        if (!unreadMessages || unreadMessages.length === 0) {
            throw new CustomError('Unread messages not found', 404, 'Request failed');
        }
        unreadMessages.forEach(msg => {
            const senderId = msg.sender._id.toString();

            if (!grouped[senderId]) {
                grouped[senderId] = {
                    senderId,
                    username: msg.sender.username,
                    avatar: msg.sender.avatar,
                    count: 1,
                    lastMessage: {
                        text: msg.text,
                        timestamp: msg.timestamp,
                    }
                };
            } else {
                grouped[senderId].count += 1;
            }
        });
        const result = Object.values(grouped);
        return sendResponse(res, 200, false, "fetched unread message", result)

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "internal server error ")
    }
});
MessageRoute.get('/recent', async (req, res) => {
    try {
        const recentMessages = await Message.find({
            $or: [
                { sender: req.user._id }, // sent messages (always included)
                {
                    receiver: req.user._id,
                    isRead: true, // only include read messages from others
                }
            ]
        })
            .sort({ timestamp: -1 })
            .populate('sender', 'username avatar')
            .populate('receiver', 'username avatar')

        if (!recentMessages || recentMessages.length === 0) {
            throw new CustomError('recent  messages not found', 404, "request failed")
        }
        const recentMap = new Map();

        recentChat.forEach(msg => {
            const isSender = msg.sender._id.toString() === req.user_id;
            const otherUser = isSender ? msg.receiver : msg.sender;
            const otherUserId = otherUser._id.toString();

            if (!recentMap.has(otherUserId)) {
                recentMap.set(otherUserId, {
                    userId: otherUserId,
                    username: otherUser.username,
                    avatar: otherUser.avatar,
                    lastMessage: {
                        text: msg.text,
                        timestamp: msg.timestamp,
                        isSender // Add this flag
                    }
                });
            }

        });
        const recentChat = Array.from(recentMap.values());
        return sendResponse(res, 200, false, "fetched recent chat ", recentChat)
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "internal server error ")
    }

})
MessageRoute.get('/users', async (req, res) => {
    try {
        const allOtherUsers = await User.find({ _id: { $ne: req.user._id } }).select('_id avatar username')
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