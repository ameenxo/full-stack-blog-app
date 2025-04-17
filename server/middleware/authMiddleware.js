const Blog = require("../models /blogModel");
const User = require("../models /userModel");
const CustomError = require("../utility/customError");
const jwt = require('jsonwebtoken');
const sendResponse = require("../utility/sendResponse");
const { validateBody } = require("../utility/validateBody");
const { userRegisterSchema, userLoginSchema } = require("../utility/schema");

async function authorization(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token)
            throw new CustomError("unauthorized access ,no token cookies provided ", 401, "unauthorized access");
        else {
            await jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
                if (error) {
                    if (error.name === "TokenExpiredError") {
                        throw new CustomError("Session expired. Please log in again.", 401, "access denied ")
                    } else if (err.name === "JsonWebTokenError") {
                        throw new CustomError("Invalid token. Please log in again.", 401, "access denied")
                    } else {
                        throw new CustomError("Authentication failed.", 403, "access  denied");
                    }
                }
                else {
                    req.user = {
                        "_id": decode._id,
                        "username": decode.username,
                        "email": decode.email,
                        "avatar": decode.avatar,
                        "createTime": decode.createTime,
                    };
                }
            })

            if (["PUT", "DELETE", "PATCH"].includes(req.method) && req.params.id) {
                const blog = await Blog.getOne(req.params.id);
                if (!blog)
                    throw new CustomError("blog not found", 404, "blog not found");
                if (blog.author.toString() !== req.user._id)
                    throw new CustomError("unauthorized access ,you are not author of this blog", 401, "unauthorized access");
                else
                    next();

            }
            else
                next();

        }
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }
};
async function checkUserExist(req, res, next) {
    try {
        const { error, message, valid } = await validateBody(req.body, userRegisterSchema, true);
        if (!valid || error) {
            throw new CustomError(message, 400, "bad request");
        }
        const { username, email } = req.body;
        const user = await User.isUserExist(username, email);
        if (user) {
            throw new CustomError("user Already exist with this email or username", 409, "user already exist");
        }
        next();
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }

};
async function authenticateUser(req, res, next) {
    try {
        const { error, message, valid } = validateBody(req.body, userLoginSchema, true);
        if (!valid || error) {
            throw new CustomError(message, 400, "bad request");
        }
        const user = await User.authenticateUser(req.body.emailOrUsername, req.body.password);
        if (!user) {
            throw new CustomError("invalid credential .username or password is incorrect", 402, "invalid credential");
        }
        res.user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            createTime: user.createdAt
        }
        res.data = user
        next();
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }
}
async function generateToken(req, res, next) {
    try {
        const token = await User.generateToken(res.user);
        if (!token)
            throw new CustomError("cannot generate token", 500, "cannot generate token");
        else {
            res.token = token
            next();
        }
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }
}
module.exports = { checkUserExist, authenticateUser, generateToken, authorization }

