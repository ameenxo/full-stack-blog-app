const express = require('express');
const { checkUserExist, authenticateUser, generateToken, authorization } = require('../middleware/authMiddleware');
const { createUser, getUserProfile } = require('../middleware/userOperation');
const sendResponse = require('../utility/sendResponse');

const AuthRoute = express.Router();


AuthRoute.post('/register', checkUserExist, createUser, (req, res) => {
    return sendResponse(res, 200, false, "successfully created an account",);
});
AuthRoute.post('/login', authenticateUser, generateToken, (req, res) => {
    try {
        res.cookie('token', res.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        return sendResponse(res, 200, false, "your successfully log in", res.data);
    } catch (error) {
        return sendResponse(res, error.statusCode, true, error.message);
    }
});
AuthRoute.post('/logout', authorization, (req, res) => {
    try {
        res.clearCookie("token", { path: "/", httpOnly: true, secure: true, sameSite: "strict" });
        return sendResponse(res, 200, false, "successfully log out");

    } catch (error) {
        return sendResponse(res, error.statusCode, true, error.message);

    }
});
AuthRoute.get('/me', authorization, getUserProfile, (req, res) => {
    try {
        return sendResponse(res, 200, false, "your successfully authorized", res.data);
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }
});
module.exports = AuthRoute
