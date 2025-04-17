const express = require('express');
const upload = require('../middleware/uploadImages');
const { addBlog, getAllBlogs, getOneBlog, updateOneBlog, deleteOneBlog, toggleLike, addComment, deleteComment } = require('../middleware/blogOperations');
const deleteImage = require('../utility/deleteImage');
const sendResponse = require('../utility/sendResponse');
const BlogRoute = express.Router();




BlogRoute.post('/', upload.single("image"), addBlog, (req, res) => {
    try {
        return sendResponse(res, 200, false, "blog added successfully", res.data);
    } catch (error) {
        if (req.file) {
            deleteImage(req.file.path);
        }
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in create blog process");
    }
});
//get all blogs for logged users
BlogRoute.get('/', getAllBlogs, (req, res) => {
    try {
        return sendResponse(res, 200, false, "fetched all blogs", res.allBlogs);

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }
});
//get one blog by blogId for logged users
BlogRoute.get('/:id', getOneBlog, (req, res) => {
    return sendResponse(res, 200, false, "fetched one blog by id", res.blog);
});
//update a blog by author of blog
BlogRoute.patch('/:id', upload.single("image"), updateOneBlog, (req, res) => {
    try {
        if (req.file && req.OldImageFile) {
            deleteImage(OldImageFile);
        }
        return sendResponse(res, 200, false, "updated successfully", res.data);
    } catch (error) {
        if (req.file) {
            deleteImage(req.file.path);
        }
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }
});
//delete a blog by author of blog
BlogRoute.delete('/:id', deleteOneBlog, (req, res) => {
    try {
        return sendResponse(res, 200, false, "deleted successfully", res.data);

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }
});
//like or unlike blog by blogId
BlogRoute.post('/like/:id', toggleLike, (req, res) => {
    try {
        return sendResponse(res, 200, false, "like updated", res.data);

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }

});
//add comment to blog by blogId
BlogRoute.post('/comment/:id', addComment, (req, res) => {
    try {
        return sendResponse(res, 200, false, "comment added successfully", res.data);

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }
});
//delete blog comment by commentId
BlogRoute.delete('/comment/:blogId/:commentId', deleteComment, (req, res) => {
    try {
        return sendResponse(res, 200, false, "comment deleted successfully", res.data);
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in authorization process");
    }

});
module.exports = BlogRoute