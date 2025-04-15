const express = require('express');
const { checkUserExist, authenticateUser, generateToken } = require('../../middleware/authMiddleware');
const { authorization } = require('../../middleware/authMiddleware');
const sendResponse = require('../../utility/sendResponse');
const { getUserProfile, UpdateUserProfile, createUser } = require('../../middleware/userOperation');
const upload = require('../../middleware/uploadImages');
const deleteImage = require('../../utility/deleteImage');


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
AuthRoute.get('/profile', authorization, getUserProfile, (req, res) => {
  try {
    return sendResponse(res, 200, false, "successfully fetched user profile ", res.data);
  } catch (error) {
    return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in fetching profile process");
  }
});
AuthRoute.patch('/profile', authorization, upload.single('avatar'), UpdateUserProfile, (req, res) => {
  try {
    return sendResponse(res, 200, false, "successfully updated user profile ", res.data);
  } catch {
    if (req.file) {
      deleteImage(req.file.filename)
    }
    return sendResponse(res, error.statusCode || 500, true, error.message || "internal server error. updating profile process");
  }
})

module.exports = AuthRoute