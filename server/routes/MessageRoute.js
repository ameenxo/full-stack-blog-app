const express = require('express');
const { getMessagesBetweenUsers } = require('../utility/messageUtility');
const CustomError = require('../utility/customError');
const sendResponse = require('../utility/sendResponse');

const MessageRoute = express.Router();

MessageRoute.get('recent', (req, res) => {
    try {

    } catch (error) {

    }
});
MessageRoute.get('/users', (req, res) => {
    try {

    } catch (error) {

    }
})
MessageRoute.get('/lastMessage/:id', (req, res) => {

    getMessagesBetweenUsers(req.user._id, req.params.id)
        .sort({ timestamp: -1 }) // latest first
        .limit(1)
        .lean()
        .then((message) => {
            if (message.length === 0) {
                throw new CustomError('cant get last message', 404, "request failed ")
            }
            return sendResponse(res, 200, false, "fetched last message with user", message)
        }).catch((error) => {
            return sendResponse(res, error.statusCode || 500, true, error.message || "internal server error ")
        })

})


module.exports = MessageRoute