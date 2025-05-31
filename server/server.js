require('dotenv').config();
require('module-alias/register')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');
const path = require('path')
const { authorization } = require('./middleware/authMiddleware.js');
const AuthRoute = require('./routes/AuthRoute.js');
const UserRoute = require('./routes/UserRoute.js');
const blogRoute = require('./routes/BlogRoute.js');
const socketServer = require('./socketServer.js');
const MessageRoute = require('./routes/MessageRoute.js');
const httpServer = require('http').createServer(app)


app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(cookieParser())
app.use('/', AuthRoute)
app.use('/user', authorization, UserRoute);
app.use('/blog', authorization, blogRoute);
app.use('/messages', authorization, MessageRoute);
app.use('/images', authorization, express.static(path.join(__dirname, 'images')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({
    extended: true

}))




app.get('*', (req, res) => {
    res.send("this page is not define").end()
});
app.post('*', (req, res) => {
    res.send("this page is not define").end()
});
app.delete('*', (req, res) => {
    res.send("this page is not define").end()
});
app.put('*', (req, res) => {
    res.send("this page is not define").end()
});

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL).then((database) => {
            httpServer.listen(process.env.PORT, () => {
                socketServer(httpServer);
                console.log("database connected & server running on port", process.env.PORT);
            })

        }).catch((error) => {
            console.log("cannot connect with database ");
            console.log(error.message);

        })

    } catch (error) {
        console.log("cannot connect with database");
        console.log(error.message);
    }

}
startServer();
