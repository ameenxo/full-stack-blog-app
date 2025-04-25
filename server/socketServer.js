const { Server } = require('socket.io')
const Message = require('./models /messageModel')
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

        socket.on('sendMessage', async ({ senderId, receiverId, text }) => {
            try {
                const newMessage = (await Message.create({ sender: senderId, receiver: receiverId, text: text, timestamp: Date.now(), isRead: false })).save()
                if (onlineUsers.has(receiverId)) {
                    const receiverSocketId = onlineUsers.get(receiverId);
                    io.to(receiverSocketId).emit("receiveMessage", newMessage);
                }
                callback({ success: true, message: "Message sent", data: newMessage });
            } catch (error) {
                callback({ success: false, message: "Failed to send message", error: error.message });
            }
        });

        socket.on('disconnect', (socket) => {
            onlineUsers.delete(userId);
        });
    })

}