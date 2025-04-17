const express = require('express');
const { getUserProfile, UpdateUserProfile } = require('../middleware/userOperation');
const sendResponse = require('../utility/sendResponse');
const upload = require('../middleware/uploadImages');
const deleteImage = require('../utility/deleteImage');
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

module.exports = UserRoute