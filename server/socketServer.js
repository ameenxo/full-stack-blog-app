const { isObjectIdOrHexString } = require('mongoose')
const { Server } = require('socket.io')
module.exports = (httpServer) => {

    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: ['GET', "POST"],
            credentials: true,
        }
    })
    io.on('connection', (socket) => {
        console.log('a client connected ')

        socket.on('disconnect', (socket) => {
            console.log("client disconnected :", socket.id);

        });
    })

}