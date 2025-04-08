const express = require('express');
const { authorization, authenticateUser } = require('../../middleware/authMiddleware');
const upload = require("../../middleware/uploadImages"); // ✅ Adjust path if needed
const blogRoute = express.Router();
const { addBlog, deleteOneBlog, getOneBlog, getAllBlogs, updateOneBlog, toggleLike, addComment, deleteComment } = require('../../middleware/blogOperations');
const { createBlogBody, getOneBlogBody, validateDeleteBody, validateCommentBody, validateDeleteCommentBody } = require('../../middleware/validateBody');
const sendResponse = require('../../utility/sendResponse');

//create new blog for logged users
blogRoute.post('/', authorization, upload.single("image"), createBlogBody, addBlog, (req, res) => {
    try {
        return sendResponse(res, 200, false, "blog added successfully", res.newBlog);
    } catch (error) {
        if (req.file) {
            deleteImage(req.file.path);
        }
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in create blog process");
    }
});
//get all blogs for logged users
blogRoute.get('/', authorization, getAllBlogs, (req, res) => {
    try {
        return sendResponse(res, 200, false, "fetched all blogs", res.allBlogs);

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }
});
//get one blog by blogId for logged users
blogRoute.get('/:id', authorization, getOneBlogBody, getOneBlog, (req, res) => {
    return sendResponse(res, 200, false, "fetched one blog by id", res.blog);


});
//update a blog by author of blog
blogRoute.put('/:id', authorization, updateOneBlog, (req, res) => {
    try {
        return sendResponse(res, 200, false, "updated successfully", res.updatedBlog);

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }
});
//delete a blog by author of blog
blogRoute.delete('/:id', validateDeleteBody, authorization, deleteOneBlog, (req, res) => {
    try {
        return sendResponse(res, 200, false, "deleted successfully", res.deletedBlog);

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }
});
//like or unlike blog by blogId
blogRoute.post('/like/:id', authorization, toggleLike, (req, res) => {
    try {
        return sendResponse(res, 200, false, "like updated", res.Blog);

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }

});
//add comment to blog by blogId
blogRoute.post('/comment/:id', validateCommentBody, authorization, addComment, (req, res) => {
    try {
        return sendResponse(res, 200, false, "comment added successfully", res.Blog);

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }
});
//delete blog comment by commentId
blogRoute.delete('/comment/:blogId/:commentId', validateDeleteCommentBody, authorization, deleteComment, (req, res) => {
    try {
        return sendResponse(res, 200, false, "comment deleted successfully", res.deleteBlogComment);
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }

});

module.exports = blogRoute