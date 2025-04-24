const User = require("../models /userModel");

async function getAvatarImageFile(userId) {
    try {
        const user = await User.findById(userId)
        if (!user) {
            return { error: true, message: "cannot find user", fileName: null }
        }
        const avatar = user.avatar;
        const filename = await avatar.split('/').pop();
        return { error: false, message: "image filename found", fileName: filename }
    } catch (error) {
        return { error: true, message: error.message, fileName: null }
    }
}
export const getAllUsersExceptLoggedIn = (loggedInUserId) => {
    return User.find({ _id: { $ne: loggedInUserId } })
        .select("_id avatar username email") // only include these fields
        .lean(); // returns plain JS objects, faster if no mongoose methods needed
}; module.exports = { getAvatarImageFile }