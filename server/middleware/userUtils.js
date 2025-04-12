const User = require('../models /userModel');
const CustomError = require('../utility/customError')
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
module.exports = { getUserProfile }
