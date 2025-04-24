const express = require('express');
const { getUserProfile, UpdateUserProfile } = require('../middleware/userOperation');
const sendResponse = require('../utility/sendResponse');
const upload = require('../middleware/uploadImages');
const deleteImage = require('../utility/deleteImage');
const User = require('../models /userModel');
const { getAllBlogs } = require('../middleware/blogOperations');
const { getAllUsersExceptLoggedIn } = require('../utility/userUtility');
const CustomError = require('../utility/customError');
const UserRoute = express.Router();


UserRoute.get('/profile', getUserProfile, (req, res) => {
    try {
        return sendResponse(res, 200, false, "successfully fetched user profile ", res.data);
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in fetching profile process");
    }
});
UserRoute.patch('/profile', upload.single('avatar'), UpdateUserProfile, (req, res) => {
    try {
        return sendResponse(res, 200, false, "successfully updated user profile ", res.data);
    } catch {
        if (req.file) {
            deleteImage(req.file.filename)
        }
        return sendResponse(res, error.statusCode || 500, true, error.message || "internal server error. updating profile process");
    }
})
UserRoute.get('/all', async (req, res) => {
    getAllUsersExceptLoggedIn(req.user._id)
        .then((users) => {
            if (users.length === 0) {
                throw new CustomError("cannot find any user", 404, "request failed")
            }
            return sendResponse(res, 200, false, "fetched all users ", users)
        }).catch((error) => {
            return sendResponse(res, error.statusCode || 500, true, error.message || "internal server error ")
        })
})

module.exports = UserRoute