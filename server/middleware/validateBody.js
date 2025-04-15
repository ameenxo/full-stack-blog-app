const validator = require('validator');
const CustomError = require('../utility/customError');
const user = require('../models /userModel')
const sendResponse = require('../utility/sendResponse');
const deleteImage = require('../utility/deleteImage');
const { validateBody } = require('../utility/validateBody');
const { blogCreateSchema } = require('../utility/schema');
function validateRegisterBody(req, res, next) {

        try {
                if (!req.body.username || !req.body.password || !req.body.email || !req.body.fullName) {
                        throw new CustomError("required field are empty", 402, 'bad request');
                }
                const { username, email, password, fullName } = req.body;
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
                return sendResponse(res, error.statusCode || 500, true, error.message || "internal server error");
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
                const { error, message, valid } = validateBody(req.body, blogCreateSchema, true);
                if (error && !valid) {
                        throw new CustomError(message, 400, "request not accept")
                }
                next();
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
function validateUpdateProfileBody(req, res, next) {
        const allowedProperties = ['fullName', 'bio', 'country'];
        const updates = req.body;
        try {
                if (!updates || Object.keys(updates).length === 0) {
                        throw new CustomError('No updates provided', 400, 'bad request');
                }
                for (const property in updates) {
                        if (!allowedProperties.includes(property)) {
                                throw new CustomError(`Invalid property: ${property}. Only fullName, bio, and country are allowed`, 400, 'bad request');
                        }
                }
                if (updates.fullName && typeof updates.fullName !== 'string') {
                        throw new CustomError('Full name must be a string', 400, 'bad request');
                }
                if (updates.bio && typeof updates.bio !== 'string') {
                        throw new CustomError('Bio must be a string', 400, 'bad request');
                }
                if (updates.country && typeof updates.country !== 'string') {
                        throw new CustomError('Country must be a string', 400, 'bad request');
                }
                next();
        } catch (error) {
                if (req.file) {
                        deleteImage(req.file.path);
                }
                return sendResponse(res, error.statusCode || 500, true, error.message || "internal server error in validating update profile body");
        }
}
function validateImageFile(req, res, next) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

        try {
                if (!req.file) {
                        req.isFileFound = false
                        return next(); // No file provided, proceed with next middleware
                }
                if (!allowedTypes.includes(req.file.mimetype)) {
                        throw new CustomError('Invalid file type. Only JPEG, PNG, and GIF are allowed', 400, 'bad request');
                }
                req.isFileFound = true
                next();
        } catch (error) {
                if (req.file) {
                        deleteImage(req.file.path)
                }
                return sendResponse(res, error.statusCode || 500, true, error.message || "internal server error in validating Avatar body");
        }
}
module.exports = { createBlogBody, validateRegisterBody, validateLoginBody, getOneBlogBody, validateDeleteBody, validateCommentBody, validateDeleteCommentBody, validateUpdateProfileBody, validateImageFile }