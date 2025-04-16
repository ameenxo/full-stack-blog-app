const User = require('../models /userModel');
const CustomError = require('../utility/customError');
const deleteImage = require('../utility/deleteImage');
const sendResponse = require('../utility/sendResponse');
const { validateBody, validateImageFile } = require('../utility/validateBody');
const { userUpdateProfileSchema } = require('../utility/schema');
const { getAvatarImageFile } = require('../utility/userUtility');

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
        if (!req.file && Object.keys(req.body).length === 0) {
            throw new CustomError('data not provided', 400, "bad request")
        }
        let oldImageFile = null
        const { error, message, valid } = validateBody(req.body, userUpdateProfileSchema, false);
        if (error || !valid) {
            throw new CustomError(message, 403, 'invalid request')
        }
        const validateImage = await validateImageFile(req, false);
        if (validateImage.error) {
            throw new CustomError(validateImage.message, 402, "invalid request")
        }
        const updateObject = req.body;
        if (validateImage.imageFound) {
            updateObject.avatar = `http://localhost:2025/images/${req.file.filename}`;
            const { error, fileName, message } = await getAvatarImageFile(req.user._id);
            if (error) {
                throw new CustomError(message, 402, "invalid request")
            }
            oldImageFile = fileName
        }
        const updatedUser = await User.updateUserProfile(req.user._id, updateObject);
        if (!updatedUser) {
            throw new CustomError("user not found", 404, "user not found");
        }
        if (req.file) {
            deleteImage(oldImageFile);
        }
        res.data = updatedUser;
        next();
    } catch (error) {
        if (req.file) {
            deleteImage(req.file.filename)
        }
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in getUserProfile Middleware");
    }
}
async function createUser(req, res, next) {
    try {
        const newUser = await User.createUser(req.body);
        if (!newUser) {
            throw new CustomError("Failed to create user. Please try again later.", 500, "cannot get any idea ")
        }
        res.userId = newUser._id
        next()

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "internal server error. from createUser middleware");
    }
}
module.exports = { getUserProfile, UpdateUserProfile, createUser }
