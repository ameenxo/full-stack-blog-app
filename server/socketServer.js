const { Server } = require('socket.io')
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
        console.log("users: ", onlineUsers);
        socket.on('disconnect', (socket) => {
            onlineUsers.delete(userId);
            console.log(`User ${userId} disconnected`);
            console.log(onlineUsers);

        });
    })

}