const Message = require('../models /userModel');

export const createMessage = (senderId, receiverId, text) => {
    const newMessage = new Message({ sender: senderId, receiver: receiverId, text });
    return newMessage.save();
};
export const getMessagesBetweenUsers = (user1Id, user2Id) => {
    return Message.find({
        $or: [
            { sender: user1Id, receiver: user2Id },
            { sender: user2Id, receiver: user1Id },
        ],
    }).sort({ createdAt: 1 });
};
export const markMessagesAsSeen = (senderId, receiverId) => {
    return Message.updateMany(
        {
            sender: senderId,
            receiver: receiverId,
            seen: false,
        },
        { $set: { seen: true } }
    );
};
export const deleteMessage = (messageId, userId) => {
    return Message.findById(messageId)
        .then((message) => {
            if (!message) throw new Error("Message not found");
            if (message.sender.toString() !== userId) {
                throw new Error("Not authorized to delete this message");
            }
            return Message.findByIdAndDelete(messageId);
        });
};