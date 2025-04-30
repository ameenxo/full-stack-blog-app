const { Server } = require('socket.io')
const Message = require('./models /messageModel');
const User = require('./models /userModel');
module.exports = (httpServer) => {

    const onlineUsers = new Map();

    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: ['GET', "POST"],
            credentials: true,
        }
    })
    io.on('connection', async (socket) => {
        const userId = socket.handshake.query.userId;
        if (!userId) {
            console.log("Connection rejected: No userId provided");
            socket.disconnect(); // force disconnect
            return;
        }
        onlineUsers.set(userId, socket.id);

        socket.on('sendMessage', async ({ senderId, receiverId, text }, callback) => {
            try {
                const newMessage = await Message.create({
                    sender: senderId,
                    receiver: receiverId,
                    text: text,
                    timestamp: Date.now(),
                    isRead: false
                });
                const message = {
                    _id: newMessage._id,
                    sender: newMessage.sender.toString(),
                    receiver: newMessage.receiver.toString(),
                    text: newMessage.text,
                    isRead: newMessage.isRead,
                    timestamp: newMessage.timestamp
                }
                if (onlineUsers.has(receiverId)) {
                    const receiverSocketId = onlineUsers.get(receiverId);
                    const senderUser = await User.findById(senderId).select(" _id username avatar");
                    const data = {
                        from: {
                            userId: senderUser._id,
                            userName: senderUser.username,
                            avatar: senderUser.avatar
                        },
                        message: message,

                    };
                    io.to(receiverSocketId).emit("receiveMessage", data);
                }
                callback({ success: true, message: "Message sent successfully", data: message });
            } catch (error) {
                callback({ success: false, message: error.message || "Failed to send message" });
            }
        });

        socket.on('disconnect', (socket) => {
            onlineUsers.delete(userId);
        });
    })

} 