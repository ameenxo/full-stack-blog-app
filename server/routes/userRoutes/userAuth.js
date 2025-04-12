const express = require('express');
const { validateRegisterBody, validateLoginBody } = require('../../middleware/validateBody');
const { checkUserExist, createUser, authenticateUser, generateToken } = require('../../middleware/authMiddleware');
const { authorization } = require('../../middleware/authMiddleware');
const sendResponse = require('../../utility/sendResponse');
const { getUserProfile } = require('../../middleware/userUtils');


const AuthRoute = express.Router();

AuthRoute.post('/register', validateRegisterBody, checkUserExist, createUser, (req, res) => {
  return sendResponse(res, 200, false, "successfully created an account",);
});
AuthRoute.post('/login', validateLoginBody, authenticateUser, generateToken, (req, res) => {
  try {
    res.cookie('token', res.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return sendResponse(res, 200, false, "your successfully log in", res.user);
  } catch (error) {
    return sendResponse(res, error.statusCode, true, error.message);
  }
});
AuthRoute.post('/logout', (req, res) => {
  try {
    res.clearCookie("token", { path: "/", httpOnly: true, secure: true, sameSite: "strict" });
    return sendResponse(res, 200, false, "successfully log out");

  } catch (error) {
    return sendResponse(res, error.statusCode, true, error.message);

  }
});
AuthRoute.get('/me', authorization, (req, res) => {
  try {
    return sendResponse(res, 200, false, "your successfully authorized", req.user);

  } catch (error) {
    return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
  }
});
AuthRoute.get('/profile', authorization, getUserProfile, (req, res) => {
  try {
    return sendResponse(res, 200, false, "successfully fetched user profile ", res.data);
  } catch (error) {
    return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in fetching profile process");
  }
})

module.exports = AuthRoute