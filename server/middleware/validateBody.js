const validator = require('validator');
const CustomError = require('../utility/customError');
const user = require('../models /userModel')
const sendResponse = require('../utility/sendResponse');
const deleteImage = require('../utility/deleteImage');
function validateRegisterBody(req, res, next) {

        try {
                if (!req.body.username || !req.body.password || !req.body.email) {
                        throw new CustomError("required field are empty", 402, 'bad request');
                }
                const { username, email, password } = req.body;
                if (!username || typeof username !== "string" || username.trim().length < 3) {
                        throw new CustomError("Username must be at least 3 characters long.", 402, "bad input at username")
                }
                if (!email || !validator.isEmail(email)) {
                        throw new CustomError("Invalid email format.", 402, "bad input at email");
                }
                if (!password || !validator.isStrongPassword(password, { minLength: 6, minNumbers: 1, minLowercase: 1 })) {
                        throw new CustomError("Password must be at least 6 characters long, contain at least one number , one capital letter and one Special Characters	.", 402, 'bad input at password')
                }
                else {
                        next();
                }
        } catch (error) {
                return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
        }

}
function validateLoginBody(req, res, next) {
        try {
                if (!req.body.emailOrUsername || !req.body.password) {
                        throw new CustomError("required field are empty", 401, 'email or username and password are not provided ');
                };
                next();
        } catch (error) {
                return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in validating login body");
        }
}
function createBlogBody(req, res, next) {
        try {

                if (!req.user)
                        throw new CustomError("cannot find user details ", 401, "user not found");
                if (!req.body.title || !req.body.content || !req.body.tags) {
                        throw new CustomError("required field are empty", 401, "bad request");
                } else next();
        } catch (error) {
                if (req.file) {
                        deleteImage(req.file.path);
                }
                return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in validating login body");
        }
};
function getOneBlogBody(req, res, next) {
        try {
                if (!req.params.id || req.params.id.length !== 24) {
                        throw new CustomError("required field are empty or not  valid  ,id", 401, "bad request");
                } else next();
        } catch (error) {
                return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in validating login body");
        }

};
function validateDeleteBody(req, res, next) {
        try {
                if (!req.params.id || req.params.id.length !== 24) {
                        throw new CustomError("required field are empty or not  valid  ,id", 401, "bad request");
                } else next();
        } catch (error) {
                return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in validating login body");
        }
};
function validateCommentBody(req, res, next) {
        try {
                if (!req.body.comment)
                        throw new CustomError("required field are empty .: comment field", 401, "bad request");
                next();

        } catch (error) {
                return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in validating login body");
        }
}
function validateDeleteCommentBody(req, res, next) {
        try {
                if (!req.params.blogId || !req.params.commentId) {
                        throw new CustomError("required field are empty .: comment field", 401, "bad request");
                }

                else if (req.params.blogId.length !== 24 || req.params.commentId.length !== 24)


                        throw new CustomError("required field are empty or not  valid  ,id", 401, "bad request");
                next();
        } catch (error) {
                return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in validating login body");
        }
}

module.exports = { createBlogBody, validateRegisterBody, validateLoginBody, getOneBlogBody, validateDeleteBody, validateCommentBody, validateDeleteCommentBody }