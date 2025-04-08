const sendResponse = (res, statusCode, error, message, data = null) => {
    return res.status(statusCode).json({
        error,
        message,
        ...(data && { data }) // Only add `data` if it's not null
    });
};

module.exports = sendResponse;
