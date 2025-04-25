const mongoose = require('mongoose');
const Message = require('../models /userModel');

function createMessage(senderId, receiverId, text) {
    const newMessage = new Message({ sender: senderId, receiver: receiverId, text });
    return newMessage.save();
};
function getMessagesBetweenUsers(user1Id, user2Id) {
    return Message.find({
        $or: [
            { sender: user1Id, receiver: user2Id },
            { sender: user2Id, receiver: user1Id },
        ],
    }).sort({ createdAt: 1 });
};
function markMessagesAsSeen(senderId, receiverId) {
    return Message.updateMany(
        {
            sender: senderId,
            receiver: receiverId,
            seen: false,
        },
        { $set: { seen: true } }
    );
};
function deleteMessage(messageId, userId) {
    return Message.findById(messageId)
        .then((message) => {
            if (!message) throw new Error("Message not found");
            if (message.sender.toString() !== userId) {
                throw new Error("Not authorized to delete this message");
            }
            return Message.findByIdAndDelete(messageId);
        });
};
// not working properly need to fix later
// function getUnreadMessages(userId) {
//     return Message.find({
//         receiver: userId,
//         isRead: false,
//     }).sort({ timestamp: -1 }).populate('sender', 'username avatar');
// }
module.exports = { getMessagesBetweenUsers, markMessagesAsSeen, deleteMessage, createMessage }