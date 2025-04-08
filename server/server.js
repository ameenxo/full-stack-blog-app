require('dotenv').config();
require('module-alias/register')
const express = require('express');
const mongoose = require('mongoose');
const AuthRoute = require('./routes/userRoutes/userAuth');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');
const blogRoute = require('./routes/blog-Routes/blog.js');
const path = require('path')
const {authorization} = require('./middleware/authMiddleware.js')


app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(cookieParser())
app.use('/user', AuthRoute);
app.use('/blog', blogRoute);
app.use("/uploads", authorization,express.static(path.join(__dirname, "uploads")));
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
            app.listen(process.env.PORT, () => {
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
