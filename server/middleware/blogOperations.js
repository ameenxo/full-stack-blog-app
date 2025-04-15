const Blog = require("../models /blogModel");
const { getImageFileNameById } = require("../utility/blogUtility");
const CustomError = require("../utility/customError");
const deleteImage = require("../utility/deleteImage");
const { blogCreateSchema, blogCommentSchema } = require("../utility/schema");
const sendResponse = require("../utility/sendResponse");
const { validateBody, validateImageFile } = require("../utility/validateBody");
const path = require("path");

//  CRUD OPERATION

async function addBlog(req, res, next) {
    try {
        const { error, valid, message } = await validateBody(req.body, blogCreateSchema, true);
        if (!valid || error) {
            throw new CustomError(message, 401, "bad request");
        }
        else {
            const { error, imageFound, message } = validateImageFile(req, true)
            if (!imageFound || error) {
                throw new CustomError(message, 401, "bad request");
            }
            const NewBlogObject = req.body;
            NewBlogObject.imageUrl = `http://localhost:2025/images/${req.file.filename}`;
            NewBlogObject.author = req.user._id;
            const newBlog = await Blog.create(NewBlogObject);
            if (!newBlog) {
                throw new CustomError("cannot create new blog", 404, "not getting exact error");
            } else {
                res.data = newBlog;
                next()
            }
        }
    } catch (error) {
        if (req.file) {
            deleteImage(req.file.path);
        }
        return sendResponse(
            res,
            error.statusCode || 500,
            true,
            error.message || "cannot get exact error. error in blog operation"
        );
    }
}
async function getAllBlogs(req, res, next) {
    try {
        const allBlogs = await Blog.getallBlog();
        if (!allBlogs)
            throw new CustomError("cannot find blogs", 404, "no blogs found");
        res.allBlogs = allBlogs;
        next();
    } catch (error) {
        return sendResponse(
            res,
            error.statusCode || 500,
            true,
            error.message || "cannot get exact error. error in blog operation"
        );
    }
}
async function getOneBlog(req, res, next) {
    try {
        if (!req.params.id || req.params.id.length !== 24) {
            throw new CustomError('required field are empty or not  valid  ,id', 401, "bad request");
        }
        const blog = await Blog.getOne(req.params.id);
        if (!blog) throw new CustomError("cannot find blog", 404, "not find blog");
        res.blog = blog;
        next();
    } catch (error) {
        return sendResponse(
            res,
            error.statusCode || 500,
            true,
            error.message || "cannot get exact error. error in blog operation"
        );
    }
}
async function deleteOneBlog(req, res, next) {
    try {
        if (!req.params.id || req.params.id.length !== 24) {
            throw new CustomError("required field are empty or not  valid  ,id", 401, "bad request");
        }
        const { error, message, fileName } = await getImageFileNameById(req.params.id);
        if (error || !fileName) {
            throw new CustomError(message, 404, "cannot find blog");
        }
        const deletedBlog = await Blog.deleteBlog(req.params.id);
        if (!deletedBlog) {
            throw new CustomError(
                "cannot delete blog",
                404,
                "not getting exact error"
            );
        }
        deleteImage(path.join(__dirname, "../images", fileName));
        res.data = deletedBlog;
        next();

    } catch (error) {
        return sendResponse(
            res,
            error.statusCode || 500,
            true,
            error.message || "cannot get exact error. error in blog operation"
        );
    }
}
async function updateOneBlog(req, res, next) {
    try {
        var oldImageFile = null;
        const { error, message, valid } = validateBody(
            req.body,
            blogCreateSchema,
            false
        );
        if (error && !valid) {
            throw new CustomError(message, 402, "request not valid");
        } else {
            const { error, imageFound, message } = validateImageFile(req, false);
            if (error) {
                throw new CustomError(message, 402, "request not valid");
            }
            const updateData = req.body;
            if (req.file) {
                const { error, message, fileName } = await getImageFileNameById(
                    req.params.id
                );
                if (error) {
                    throw new CustomError(message, 404, "cannot find blog");
                }
                oldImageFile = fileName;
                updateData.imageUrl = `http://localhost:2025/images/${req.file.filename}`;
            }
            const updatedBlog = await Blog.updateById(req.params.id, updateData);

            if (!updatedBlog) {
                throw new CustomError(
                    `blog not found with ${req.params.id}`,
                    401,
                    "invalid request"
                );
            }
            res.data = updatedBlog;
            if (oldImageFile && imageFound) {
                deleteImage(path.join(__dirname, "../images", oldImageFile));
            }
            next();
        }
    } catch (error) {
        if (req.file) {
            deleteImage(req.file.path);
        }
        return sendResponse(
            res,
            error.statusCode || 500,
            true,
            error.message || "cannot get exact error. error in blog operation"
        );
    }
}
// USER ACTIONS
async function toggleLike(req, res, next) {
    try {
        const blog = await Blog.toggleLike(req.params.id, req.user._id);
        if (!blog) {
            throw new CustomError(
                "cannot update like",
                404,
                "not getting exact error"
            );
        } else {
            res.data = blog;
            next();
        }
    } catch (error) {
        return sendResponse(
            res,
            error.statusCode || 500,
            true,
            error.message || "cannot get exact error. error in blog operation"
        );
    }
}
async function addComment(req, res, next) {
    try {
        const { error, message, valid } = validateBody(req.body, blogCommentSchema, true);
        if (error || !valid) {
            throw new CustomError(message, 401, "bad request");
        }
        const blogComment = await Blog.addComment(
            req.params.id,
            req.user._id,
            req.body.comment
        );
        if (!blogComment)
            throw new CustomError(
                "cannot add comment",
                404,
                "not getting exact error"
            );
        else {
            res.data = blogComment;
            next();
        }
    } catch (error) {
        return sendResponse(
            res,
            error.statusCode || 500,
            true,
            error.message || "cannot get exact error. error in blog operation"
        );
    }
}

async function deleteComment(req, res, next) {
    try {
        if (!req.params.blogId || !req.params.commentId || req.params.blogId.length !== 24 || req.params.commentId.length !== 24) {
            throw new CustomError("required field are empty or not  valid  ,id", 401, "bad request");
        }
        const deleteBlogComment = await Blog.deleteComment(
            req.params.blogId,
            req.user._id,
            req.params.commentId
        );
        if (!deleteBlogComment) {
            throw new CustomError(
                "cannot delete comment",
                404,
                "not getting exact error"
            );
        }
        res.data = deleteBlogComment;
        next();
    } catch (error) {
        return sendResponse(
            res,
            error.statusCode || 500,
            true,
            error.message || "cannot get exact error. error in blog operation"
        );
    }
}

module.exports = {
    addBlog,
    deleteOneBlog,
    getOneBlog,
    getAllBlogs,
    updateOneBlog,
    toggleLike,
    addComment,
    deleteComment,
};
