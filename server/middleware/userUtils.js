const { log } = require('console');
const User = require('../models /userModel');
const CustomError = require('../utility/customError');
const deleteImage = require('../utility/deleteImage');
const sendResponse = require('../utility/sendResponse');
const path = require('path')
async function getUserProfile(req, res, next) {
    try {
        const userProfile = await User.getUserProfile(req.user._id);
        if (!userProfile) {
            throw new CustomError("user not found", 404, "user not found");
        }
        res.data = userProfile
        next();
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in getUserProfile Middleware");
    }
}
async function UpdateUserProfile(req, res, next) {
    try {
        const updateObject = {
            name: req.body.fullName,
            bio: req.body.bio,
            country: req.body.country
        };
        if (req.isFileFound) {
            updateObject.avatar = `http://localhost:2025/images/${req.file.filename}`;
        }
        const updatedUser = await User.updateUserProfile(req.user._id, updateObject);
        if (!updatedUser) {
            throw new CustomError("user not found", 404, "user not found");
        }
        res.data = updatedUser;
        next();
    } catch (error) {
        if (req.file) {
            deleteImage(req.file.path)
        }
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in getUserProfile Middleware");
    }
}
async function DeleteUserAvatar(req, res, next) {
    try {
        const user = await User.getUserProfile(req.user._id);
        if (!user) {
            throw new CustomError("user not found", 404, "user not found");
        }
        const oldAvatarUrl = user.avatar;
        const oldFilename = await oldAvatarUrl.split('/').pop();
        if (!oldFilename || oldFilename === "default.jpg") {
            return next();
        }
        await deleteImage(path.join(__dirname, "../images", oldFilename));
        next();

    } catch (error) {
        if (req.file) {
            deleteImage(req.file.path)
        }
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in getUserProfile Middleware");
    }

}
module.exports = { getUserProfile, UpdateUserProfile, DeleteUserAvatar }
